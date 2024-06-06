package com.dimmunity.Tree.entity;

//DB의 테이블 역할을 하는 클래스
//Service와 Repository 딴에서만 이용하게 됨

import com.dimmunity.Tree.dto.BoardDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "board_table") // 특정 테이블 이름을 따로 주고싶을 때
@EntityListeners(AuditingEntityListener.class) // 생성시, 수정시에 찍히는 시간 관리
public class BoardEntity {
    @Id //pk 컬럼 지정 (필수!)
    @GeneratedValue(strategy = GenerationType.IDENTITY) //mysql 기준 auto_increment 지정
    private Long id;

    //column 크기 지정
    @Column(length = 20, nullable = false) // 크기는 20, null 일 수 없다. (default 는 255, null 가능)
    private String boardWriter;
    @Column
    private String bookTitle;
    @Column
    private String bookAuthor;
    @Column
    private String bookCategoryName;
    @Column
    private String bookImageURL;
    @Column
    private String boardPass;

    @Column(length = 500)
    private String boardPhrase;

    @Column(length = 500)
    private String boardReason;

    @Column
    private int boardHits;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdTime;

    @UpdateTimestamp
    @Column(insertable = false)
    private LocalDateTime updatedTime;

    // 변환작업
    // boardSave.html 에서 입력한 값을 boardDTO로 담아오고 거기에 담겨있는 값들을 Entity의 값으로 set 하는 것 (DTO -> Entity)
    public static BoardEntity toSaveEntity(BoardDTO boardDTO){
        // DTO에 담긴 값들을 객체로 옮겨담는 작업
        BoardEntity boardEntity = new BoardEntity();
        boardEntity.setBoardWriter(boardDTO.getBoardWriter());
        boardEntity.setBoardPass(boardDTO.getBoardPass());
        boardEntity.setBookAuthor(boardDTO.getBookAuthor());
        boardEntity.setBookImageURL(boardDTO.getBookImageURL());
        boardEntity.setBookTitle(boardDTO.getBookTitle());
        boardEntity.setBookCategoryName(boardDTO.getBookCategoryName());
        boardEntity.setBoardPhrase(boardDTO.getBoardPhrase());
        boardEntity.setBoardReason(boardDTO.getBoardReason());
        boardEntity.setBoardHits(0); // 조회수값은 기본적으로 0이니까
        return boardEntity;
    }

    public static BoardEntity toUpdateEntity(BoardDTO boardDTO){
        BoardEntity boardEntity = new BoardEntity();
        // id 가 있어야만 update query 수행됨
        boardEntity.setId(boardDTO.getId());
        boardEntity.setBoardWriter(boardDTO.getBoardWriter());
        boardEntity.setBoardPass(boardDTO.getBoardPass());
        boardEntity.setBookAuthor(boardDTO.getBookAuthor());
        boardEntity.setBookImageURL(boardDTO.getBookImageURL());
        boardEntity.setBookTitle(boardDTO.getBookTitle());
        boardEntity.setBookCategoryName(boardDTO.getBookCategoryName());
        boardEntity.setBoardPhrase(boardDTO.getBoardPhrase());
        boardEntity.setBoardReason(boardDTO.getBoardReason());
        boardEntity.setBoardHits(boardDTO.getBoardHits());
        return boardEntity;
    }
}



