package com.dimmunity.Tree.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor // 기본 생성자
@AllArgsConstructor // 모든 필드를 매개변수로 하는 생성자


public class BoardDTO {
    private Long id;
    private String boardWriter;
    private String boardPass;
    private String boardTitle;
    private String boardContents;
    //게시글의 조회수
    private int boardHits;
    //게시글 작성시간
    private LocalDateTime boardCreatedTime;
    //게시글 수정시간
    private LocalDateTime boardUpdatedTime;
}
