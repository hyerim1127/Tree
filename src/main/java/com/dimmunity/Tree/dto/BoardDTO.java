package com.dimmunity.Tree.dto;

import com.dimmunity.Tree.entity.BoardEntity;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor // 기본 생성자
@AllArgsConstructor // 모든 필드를 매개변수로 하는 생성자


public class BoardDTO {
    private Long id;
    private String bookTitle;
    private String bookAuthor;
    private String bookCategoryName;
    private String bookImageURL;
    private String boardWriter;
    private String boardPass;
    private String boardTitle;
    private String boardPhrase;
    private String boardReason;
    //게시글의 조회수
    private int boardHits;
    //게시글 작성시간
    private LocalDateTime boardCreatedTime;
    //게시글 수정시간
    private LocalDateTime boardUpdatedTime;

    // entity 객체를 dto 객체로 옮겨 담는 과정 (Entity -> DTO)
    public static BoardDTO toBoardDTO(BoardEntity boardEntity){
        BoardDTO boardDTO = new BoardDTO();
        boardDTO.setId(boardEntity.getId());
        boardDTO.setBoardWriter(boardEntity.getBoardWriter());
        boardDTO.setBoardPass(boardEntity.getBoardPass());
        boardDTO.setBoardTitle(boardEntity.getBoardTitle());
        boardDTO.setBoardPhrase(boardEntity.getBoardPhrase());
        boardDTO.setBoardReason(boardEntity.getBoardReason());
        boardDTO.setBoardHits(boardEntity.getBoardHits());
        boardDTO.setBoardCreatedTime(boardEntity.getCreatedTime());
        boardDTO.setBoardUpdatedTime(boardEntity.getUpdatedTime());
        return boardDTO;
    }
}
