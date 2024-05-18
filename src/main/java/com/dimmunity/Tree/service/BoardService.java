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
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;

    public void save(BoardDTO boardDTO){
        // 메소드 호출한 결과가 boardEntity로 받아오고 그것을 save 메소드로 넘겨주면 insert query가 나가게 된다.
        BoardEntity boardEntity = BoardEntity.toSaveEntity(boardDTO);
        boardRepository.save(boardEntity);
    }
}
