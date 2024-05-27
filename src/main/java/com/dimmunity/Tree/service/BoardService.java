package com.dimmunity.Tree.service;

// DTO -> Entity 클래스로 변환 하거나, (이 과정은 Entity Class에서 이루어지게 된다.)
// Entity -> DTO 클래스로 변환하는 역할을 한다. (이 과정은 DTO Class에서 이루어지게 된다.)

// Controller로 부터 호출을 넘겨 받을 때는 DTO로 넘겨 받는데,
// Repository로 넘겨줄때는 Entity로 넘겨준다.
// DB의 데이터를 조회할때는 Repository로부터 Entity로 받아오는데,
// Controller로 return 할때는 DTO로 바꿔서 넘겨준다.

import com.dimmunity.Tree.dto.BoardDTO;
import com.dimmunity.Tree.entity.BoardEntity;
import com.dimmunity.Tree.repository.BoardRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;

    public void save(BoardDTO boardDTO){
        // 메소드 호출한 결과가 boardEntity로 받아오고 그것을 save 메소드로 넘겨주면 insert query가 나가게 된다.
        BoardEntity boardEntity = BoardEntity.toSaveEntity(boardDTO);
        boardRepository.save(boardEntity);
    }

    public List<BoardDTO> findAll() {
        // entity로 받아온 정보를 dto 객체로 옮겨 담아서 controller로 return 한다.

        List<BoardEntity> boardEntityList = boardRepository.findAll();
        // return 할 list 객체 선언
        List<BoardDTO> boardDTOList = new ArrayList<>();
        // List<BoardEntity>에 담긴 데이터를 List<BoardDTO>에 옮겨 담기 (즉, entity객체를 dto 객체로 옮겨 담기)
        for (BoardEntity boardEntity: boardEntityList){
            // boardEntity 객체를 DTO로 변환하고(BoardDTO.toBoardDTO(boardEntity) boardDTOList에 담는 과정
            boardDTOList.add(BoardDTO.toBoardDTO(boardEntity));
        }
        return boardDTOList;
    }

    // 조회수 증가 메소드
    @Transactional
    public void updateHits(Long id){
        boardRepository.updateHits(id);
    }


    public BoardDTO findById(Long id){
        Optional<BoardEntity> optionalBoardEntity = boardRepository.findById(id);
        if(optionalBoardEntity.isPresent()) {
            BoardEntity boardEntity = optionalBoardEntity.get();
            BoardDTO boardDTO = BoardDTO.toBoardDTO(boardEntity);
            return boardDTO;
        } else {
            return null;
        }

    }

    public BoardDTO update(BoardDTO boardDTO){
        BoardEntity boardEntity = BoardEntity.toUpdateEntity(boardDTO);
        boardRepository.save(boardEntity);
        return findById(boardDTO.getId());
    }

    public void delete(Long id){
        boardRepository.deleteById(id);
    }
}
