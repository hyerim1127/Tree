package com.dimmunity.Tree.controller;


import com.dimmunity.Tree.dto.BookDTO;
import com.dimmunity.Tree.service.BookService;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    private BookService bookService;

    @GetMapping("/book")
    public String home(Model model) {
        model.addAttribute("board", new BookDTO());
        return "bookSearch";
    }
    @GetMapping("/bookSave")
    public String bookSave() {
        return "bookSave";
    }
    @GetMapping("/book-search")
    public String BookSearchHome(Model model) {
        String keyword = "";
        model.addAttribute("keyword", keyword);
        return "bookSearch";
    }

    @PostMapping("/book-search")
    public String search(@ModelAttribute("keyword") String keyword, Model model) {
        List<BookDTO> bookDtoList= bookService.searchBooksWithCategories(keyword);
        model.addAttribute("bookDtoList", bookDtoList);
        return "bookSearch";
    }
}