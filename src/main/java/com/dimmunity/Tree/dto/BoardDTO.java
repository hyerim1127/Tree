package com.dimmunity.Tree.dto;

import com.dimmunity.Tree.entity.BoardEntity;
import lombok.*;

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
    private String boardPhrase;
    private String boardReason;

    public static BoardDTO fromEntity(BoardEntity entity) {
        return new BoardDTO(
                entity.getId(),
                entity.getBookTitle(),
                entity.getBookAuthor(),
                entity.getBookCategoryName(),
                entity.getBookImageURL(),
                entity.getBoardWriter(),
                entity.getBoardPhrase(),
                entity.getBoardReason()
        );
    }

    // entity 객체를 dto 객체로 옮겨 담는 과정 (Entity -> DTO)
    public static BoardDTO toBoardDTO(BoardEntity boardEntity){
        BoardDTO boardDTO = new BoardDTO();

        boardDTO.setId(boardEntity.getId());
        boardDTO.setBoardWriter(boardEntity.getBoardWriter());
        boardDTO.setBookTitle(boardEntity.getBookTitle());
        boardDTO.setBoardPhrase(boardEntity.getBoardPhrase());
        boardDTO.setBoardReason(boardEntity.getBoardReason());

        boardDTO.setBookAuthor(boardEntity.getBookAuthor());
        boardDTO.setBookCategoryName(boardEntity.getBookCategoryName());
        boardDTO.setBookImageURL(boardEntity.getBookImageURL());

        return boardDTO;
    }

}
