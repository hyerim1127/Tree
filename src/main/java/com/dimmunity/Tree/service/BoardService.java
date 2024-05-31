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

    // DB 로부터 paging 처리된 db 가져옴
    public Page<BoardDTO> paging(Pageable pageable){
        // getPageNumber() 메소드를 사용해서 몇페이지를 요청했는지 가져올 수 있다.
        // page 위치에 있는 값은 0부터 시작이기 때문에 -1 을 해준다.
        int page = pageable.getPageNumber() - 1;
        int pageLimit = 5;
        // findAll 함수를 호출하는데, 전달되는 값이 많다.
        /*
                page :  몇페이지를 보고 싶은지
                pageLimit : 한 페이지에 보여줄 글 갯수
                Sort.~ : 어떻게 정렬을 해서 해당 페이지 값을 가져올것인지
                    - id (기준 컬럼 - 엔티티에 작성한 이름 기준(DB 컬럼 기준 X)) 기준을 가지고 가져오겠다.
                    - 레포지토리에서 가져오는 것이기 때문에 엔티티가 담겨있을 것이다.
                ∴ 의미하는 바 = 한페이지당 5개씩 글을 보여주고 정렬 기준은 id 기분으로 내림차순 정렬
         */
        // 지금은 List 객체가 아니라 Page 객체다.
        Page<BoardEntity> boardEntities =
                boardRepository.findAll(PageRequest.of(page, pageLimit, Sort.by(Sort.Direction.DESC,"id")));

        System.out.println("boardEntities.getContent() = " + boardEntities.getContent()); // 요청 페이지에 해당하는 글
        System.out.println("boardEntities.getTotalElements() = " + boardEntities.getTotalElements()); // 전체 글 갯수
        System.out.println("boardEntities.getNumber() = " + boardEntities.getNumber()); // DB로 요청한 페이지 번호 (사용자가 1p 요청했다면, DB로는 0)
        System.out.println("boardEntities.getTotalPages() = " + boardEntities.getTotalPages()); // 전체 페이지 갯수 (글 갯수 14개일때, 3개씩 보여주면 5개 페이지 존재해야함)
        System.out.println("boardEntities.getSize() = " + boardEntities.getSize()); // 한 페이지에 보여지는 글 갯수
        System.out.println("boardEntities.hasPrevious() = " + boardEntities.hasPrevious()); // 이전 페이지 존재 여부 (T,F)
        System.out.println("boardEntities.isFirst() = " + boardEntities.isFirst()); // 첫 페이지 여부 (T,F)
        System.out.println("boardEntities.isLast() = " + boardEntities.isLast()); // 마지막 페이지 여부 (T,F)

        // map 은 Page 객체에서 제공해주는 메소드이고, board 는 엔티티 개체다. board 에서 변수를 하나씩 꺼내서 BoardDTO로 옮겨 담는다.(즉, 바꿔주는 거다.)
        // 페이지 목록에서 보여주면 되는 데이터 : id, writer, title, hits, createdTime -> 이정보를 담을 수 있는 DTO 생성자를 추가하면 된다.
        Page<BoardDTO> boardDTOS = boardEntities.map(board -> new BoardDTO(board.getId(),
                board.getBoardPhrase(), board.getBoardWriter(),
                board.getBookTitle(),board.getBookAuthor(),board.getBookCategoryName(), board.getBookImageURL(),
                board.getBoardHits(), board.getCreatedTime()));
//

        return boardDTOS; // DTO 객체를 controller 쪽으로 return 한다.
    }
}
