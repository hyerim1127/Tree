package com.dimmunity.Tree.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

// items에 들어갈 VO

@ToString
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class BookVo {
    private String title;
    private String link;
    private String image;
    private String author;
    private String discount;
    private String publisher;
    private String pubdate;
    private String isbn;
    private String description;
}
