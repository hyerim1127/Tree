package com.dimmunity.Tree.entity;

import com.dimmunity.Tree.dto.BoardDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "board_table")
public class BoardEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 20, nullable = false)
    private String boardWriter;

    @Column
    private String bookTitle;

    @Column
    private String bookAuthor;

    @Column
    private String bookCategoryName;

    @Column
    private String bookImageURL;

    @Column(length = 2000)
    private String boardPhrase;

    @Column(length = 2000)
    private String boardReason;

    public static BoardEntity toSaveEntity(BoardDTO boardDTO) {
        BoardEntity boardEntity = new BoardEntity();
        boardEntity.setBoardWriter(boardDTO.getBoardWriter());
        boardEntity.setBookAuthor(boardDTO.getBookAuthor());
        boardEntity.setBookImageURL(boardDTO.getBookImageURL());
        boardEntity.setBookTitle(boardDTO.getBookTitle());
        boardEntity.setBookCategoryName(boardDTO.getBookCategoryName());
        boardEntity.setBoardPhrase(boardDTO.getBoardPhrase());
        boardEntity.setBoardReason(boardDTO.getBoardReason());
        return boardEntity;
    }

    public static BoardEntity toUpdateEntity(BoardDTO boardDTO) {
        BoardEntity boardEntity = new BoardEntity();
        boardEntity.setId(boardDTO.getId());
        boardEntity.setBoardWriter(boardDTO.getBoardWriter());
        boardEntity.setBookAuthor(boardDTO.getBookAuthor());
        boardEntity.setBookImageURL(boardDTO.getBookImageURL());
        boardEntity.setBookTitle(boardDTO.getBookTitle());
        boardEntity.setBookCategoryName(boardDTO.getBookCategoryName());
        boardEntity.setBoardPhrase(boardDTO.getBoardPhrase());
        boardEntity.setBoardReason(boardDTO.getBoardReason());
        return boardEntity;
    }
}