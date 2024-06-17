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
    private String boardPhrase;
    private String boardReason;
    //게시글의 조회수
    private int boardHits;
    //게시글 작성시간
    private LocalDateTime boardCreatedTime;
    //게시글 수정시간
    private LocalDateTime boardUpdatedTime;


    public static BoardDTO fromEntity(BoardEntity entity) {
        return new BoardDTO(
                entity.getId(),
                entity.getBookTitle(),
                entity.getBookAuthor(),
                entity.getBookCategoryName(),
                entity.getBookImageURL(),
                entity.getBoardWriter(),
                entity.getBoardPass(),
                entity.getBoardPhrase(),
                entity.getBoardReason(),
                entity.getBoardHits(),
                entity.getCreatedTime(),
                entity.getUpdatedTime()
        );
    }

    // 5개를 매개변수로 하는 생성자 생성
    public BoardDTO(Long id, String boardPhrase, String boardWriter, String bookAuthor,
                    String bookCategoryName, String bookTitle, String bookImageURL, int boardHits, LocalDateTime boardCreatedTime) {
        //
        this.id = id;
        this.boardPhrase = boardPhrase;
        this.boardWriter = boardWriter;
        this.bookTitle = bookTitle;
        this.bookAuthor = bookAuthor;
        this.bookCategoryName = bookCategoryName;
        this.bookImageURL = bookImageURL;
        this.boardHits = boardHits;
        this.boardCreatedTime = boardCreatedTime;
    }

    // entity 객체를 dto 객체로 옮겨 담는 과정 (Entity -> DTO)
    public static BoardDTO toBoardDTO(BoardEntity boardEntity){
        BoardDTO boardDTO = new BoardDTO();

        boardDTO.setId(boardEntity.getId());
        boardDTO.setBoardWriter(boardEntity.getBoardWriter());
        boardDTO.setBoardPass(boardEntity.getBoardPass());
        boardDTO.setBookTitle(boardEntity.getBookTitle());
        boardDTO.setBoardPhrase(boardEntity.getBoardPhrase());
        boardDTO.setBoardReason(boardEntity.getBoardReason());
        boardDTO.setBoardHits(boardEntity.getBoardHits());
        boardDTO.setBoardCreatedTime(boardEntity.getCreatedTime());
        boardDTO.setBoardUpdatedTime(boardEntity.getUpdatedTime());

        boardDTO.setBookAuthor(boardEntity.getBookAuthor());
        boardDTO.setBookCategoryName(boardEntity.getBookCategoryName());
        boardDTO.setBookImageURL(boardEntity.getBookImageURL());

        return boardDTO;
    }
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CategoryCount{
        private String bookCategoryName;
        private Long postCount;
    }

}
