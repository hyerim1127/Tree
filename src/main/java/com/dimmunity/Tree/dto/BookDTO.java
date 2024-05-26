package com.dimmunity.Tree.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class BookDTO {
    private Long id;
    private String title;
    private String author;
    private String imageURL;
    private String isbn;
    private String category;
    private String description;

    @Builder
    public BookDTO(String title, String author, String imageURL,String isbn,String category,String description) {
        this.title = title;
        this.author = author;
        this.imageURL = imageURL;
        this.isbn=isbn;
        this.category=category;
        this.description=description;
    }
}