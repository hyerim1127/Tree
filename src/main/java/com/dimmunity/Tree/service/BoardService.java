package com.dimmunity.Tree.service;

// DTO -> Entity 클래스로 변환 하거나, (이 과정은 Entity Class에서 이루어지게 된다.)
// Entity -> DTO 클래스로 변환하는 역할을 한다. (이 과정은 DTO Class에서 이루어지게 된다.)

// Controller로 부터 호출을 넘겨 받을 때는 DTO로 넘겨 받는데,
// Repository로 넘겨줄때는 Entity로 넘겨준다.
// DB의 데이터를 조회할때는 Repository로부터 Entity로 받아오는데,
// Controller로 return 할때는 DTO로 바꿔서 넘겨준다.

import ch.qos.logback.core.net.SyslogOutputStream;
import com.dimmunity.Tree.dto.BoardDTO;
import com.dimmunity.Tree.entity.BoardEntity;
import com.dimmunity.Tree.repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BoardService {
    @Autowired
    private final BoardRepository boardRepository;

    public void save(BoardDTO boardDTO) {
        // 메소드 호출한 결과가 boardEntity로 받아오고 그것을 save 메소드로 넘겨주면 insert query가 나가게 된다.
        BoardEntity boardEntity = BoardEntity.toSaveEntity(boardDTO);
        boardRepository.save(boardEntity);
    }

    public List<BoardDTO> findAll() {
        List<BoardEntity> boardEntityList = boardRepository.findAll();
        List<BoardDTO> boardDTOList = new ArrayList<>();
        for (BoardEntity boardEntity : boardEntityList) {
            boardDTOList.add(BoardDTO.toBoardDTO(boardEntity));
        }
        return boardDTOList;
    }

    // 조회수 증가 메소드

    public BoardDTO findById(Long id) {
        Optional<BoardEntity> optionalBoardEntity = boardRepository.findById(id);
        if (optionalBoardEntity.isPresent()) {
            BoardEntity boardEntity = optionalBoardEntity.get();
            BoardDTO boardDTO = BoardDTO.toBoardDTO(boardEntity);
            return boardDTO;
        } else {
            return null;
        }

    }

    public BoardDTO update(BoardDTO boardDTO) {
        BoardEntity boardEntity = BoardEntity.toUpdateEntity(boardDTO);
        boardRepository.save(boardEntity);
        return findById(boardDTO.getId());
    }

    public void delete(Long id) {
        boardRepository.deleteById(id);
    }

    // DB 로부터 paging 처리된 db 가져옴
    public Page<BoardDTO> paging(Pageable pageable) {
        int page = pageable.getPageNumber() - 1;
        int pageLimit = 5;

        Page<BoardEntity> boardEntities =
                boardRepository.findAll(PageRequest.of(page, pageLimit, Sort.by(Sort.Direction.DESC, "id")));

        Page<BoardDTO> boardDTOS = boardEntities.map(board -> new BoardDTO(board.getId(),
                board.getBoardPhrase(), board.getBoardWriter(),
                board.getBookTitle(), board.getBookAuthor(), board.getBookCategoryName(), board.getBookImageURL(),board.getBoardReason()
        ));
//

        return boardDTOS; // DTO 객체를 controller 쪽으로 return 한다.
    }

    public List<BoardDTO> findByCategory(String genre) {
        List<BoardEntity> entities = boardRepository.findByBookCategoryName(genre);
        return entities.stream()
                .map(BoardDTO::fromEntity)
                .collect(Collectors.toList());
    }
}


