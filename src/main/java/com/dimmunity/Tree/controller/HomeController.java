package com.dimmunity.Tree.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    //로그인화면이 첫페이지로 나오도록
    @GetMapping("/")
    public String index(){
        return "login";  //templates폴더의 index.html
    }
}
