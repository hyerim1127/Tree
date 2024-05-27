package com.dimmunity.Tree.service;

import com.dimmunity.Tree.dto.BookDTO;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.client.RestTemplate;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

@Service
public class BookService {
    private static final String CLIENT_ID = "mapzG0yKG3_rkHMfiaKt";
    private static final String CLIENT_SECRET = "2yTFmB_pY5";
    private static final String ALADIN_API_URL = "https://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=ttbdlwls68771039001&itemIdType=ISBN&ItemId=";

    public  List<BookDTO> searchBooksWithCategories(String query) {
        List<BookDTO> bookList = searchBooks(query);

        for (BookDTO book : bookList) {
            String categoryInfo = getCategoryByIsbn(book.getIsbn());
            String[] categoryParts = categoryInfo.split(">");
            if (categoryParts.length > 1) {
                book.setCategoryName(categoryParts[2]);
                book.setCategoryId(categoryParts[1].replace("(", "").replace(")", ""));
            } else {
                book.setCategoryName(categoryInfo);
                book.setCategoryId("");
            }
        }

        return bookList;
    }
    private List<BookDTO> searchBooks(String keyword) {
        List<BookDTO> bookDtoList = new ArrayList<>();

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

        } catch (Exception e) {
            e.printStackTrace();
        }
        return bookDtoList;
    }

    private String getCategoryByIsbn(String isbn) {
        String url = ALADIN_API_URL + isbn + "&output=js&Version=20131101";

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

        JSONObject jsonObject = new JSONObject(response.getBody());
        JSONArray itemArray = jsonObject.getJSONArray("item");

        if (itemArray.length() > 0) {
            JSONObject item = itemArray.getJSONObject(0);
            String categoryName = item.getString("categoryName");
            Object categoryIDObj = item.get("categoryId");
            String categoryId=String.valueOf(categoryIDObj);
            return categoryName + " (" + categoryId + ")";
        }
        return "카테고리 없음";
    }
}
