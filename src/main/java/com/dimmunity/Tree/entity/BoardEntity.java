package com.dimmunity.Tree.entity;

//DB의 테이블 역할을 하는 클래스
//Service와 Repository 딴에서만 이용하게 됨

import com.dimmunity.Tree.dto.BoardDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "board_table") // 특정 테이블 이름을 따로 주고싶을 때
public class BoardEntity extends BaseEntity{
    @Id //pk 컬럼 지정 (필수!)
    @GeneratedValue(strategy = GenerationType.IDENTITY) //mysql 기준 auto_increment 지정
    private Long id;

    //column 크기 지정
    @Column(length = 20, nullable = false) // 크기는 20, null 일 수 없다. (default 는 255, null 가능)
    private String boardWriter;

    @Column
    private String boardPass;

    @Column
    private String boardTitle;

    @Column(length = 500)
    private String boardContents;

    @Column
    private int boardHits;

    // 변환작업
    // save.html 에서 입력한 값을 boardDTO로 담아오고 거기에 담겨있는 값들을 Entity의 값으로 set 하는 것
    public static BoardEntity toSaveEntity(BoardDTO boardDTO){
        // DTO에 담긴 값들을 객체로 옮겨담는 작업
        BoardEntity boardEntity = new BoardEntity();
        boardEntity.setBoardWriter(boardDTO.getBoardWriter());
        boardEntity.setBoardPass(boardDTO.getBoardPass());
        boardEntity.setBoardTitle(boardDTO.getBoardTitle());
        boardEntity.setBoardContents(boardDTO.getBoardContents());
        boardEntity.setBoardHits(0); // 조회수값은 기본적으로 0이니까
        return boardEntity;
    }


}
