package com.dimmunity.Tree.dto;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class BookDTO {
    private Long id;
    private String title;
    private String author;
    private String imageURL;
    private String isbn;
    private String categoryName;
    private String categoryId;
    private String description;

    @Builder
    public BookDTO(String title, String author, String imageURL,String isbn,String categoryName,String categoryId,String description) {
        this.title = title;
        this.author = author;
        this.imageURL = imageURL;
        this.isbn=isbn;
        this.categoryName=categoryName;
        this.categoryId=categoryId;
        this.description=description;
    }

}