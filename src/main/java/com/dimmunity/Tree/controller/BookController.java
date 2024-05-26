package com.dimmunity.Tree.controller;


import com.dimmunity.Tree.dto.BookDTO;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

@Controller
public class BookController {

    // 네이버 도서 검색 api key
    private final String CLIENT_ID = "mapzG0yKG3_rkHMfiaKt";
    private final String CLIENT_SECRET = "2yTFmB_pY5";


    @GetMapping("/book")
    public String home(Model model) {
        model.addAttribute("board", new BookDTO());
        return "bookSearch";
    }

    @GetMapping("/book-search")
    public String BookSearchHome(Model model) {
        String keyword = "";
        model.addAttribute("keyword", keyword);
        return "bookSearch";
    }

    @PostMapping("/book-search")
    public String search(@ModelAttribute("keyword") String keyword, Model model) {
        try {
            //검색어 받아와 URL 생성
            String encodedKeyword = URLEncoder.encode(keyword, "UTF-8");
            String apiURL = "https://openapi.naver.com/v1/search/book.json?query=" + encodedKeyword;
            URL url = new URL(apiURL);

            //HttpConnection
            HttpURLConnection con = (HttpURLConnection) url.openConnection();

            con.setRequestMethod("GET");
            con.setRequestProperty("X-Naver-Client-Id", CLIENT_ID);
            con.setRequestProperty("X-Naver-Client-Secret", CLIENT_SECRET);

            //응답코드
            int responseCode = con.getResponseCode();
            BufferedReader br;

            if (responseCode == 200) { // 정상 호출
                br = new BufferedReader(new InputStreamReader(con.getInputStream()));
            } else {  // 에러 발생
                br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
            }

            String inputLine;
            StringBuffer response = new StringBuffer();

            //응답을 받아와 버퍼에 넣음
            while ((inputLine = br.readLine()) != null) {
                response.append(inputLine);
            }
            br.close();


            //JSONobject 생성으로 응답 스트링반환
            JSONObject jsonObject = new JSONObject(response.toString());
            JSONArray jsonArray = (JSONArray) jsonObject.get("items");
            List<BookDTO> bookDtoList = new ArrayList<>();

            //bookDtoList 객체에 하나씩 넣어줌
            for (int i = 0; i < jsonArray.length(); i++) {
                JSONObject obj = jsonArray.getJSONObject(i);
                String title = obj.getString("title");
                String author = obj.getString("author");
                String image = obj.getString("image");
                String isbn = obj.getString("isbn");
                String description = obj.getString("description");


                bookDtoList.add(BookDTO.builder()
                        .title(title)
                        .author(author)
                        .imageURL(image)
                        .isbn(isbn)
                        .description(description).build());
            }
            model.addAttribute("bookDtoList", bookDtoList);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return "bookSearch";
    }
}