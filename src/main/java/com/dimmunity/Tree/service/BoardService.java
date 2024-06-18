package com.dimmunity.Tree.service;

import com.dimmunity.Tree.dto.BoardDTO;
import com.dimmunity.Tree.entity.BoardEntity;
import com.dimmunity.Tree.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;

    public void save(BoardDTO boardDTO) {
        BoardEntity boardEntity = BoardEntity.toSaveEntity(boardDTO);
        boardRepository.save(boardEntity);
    }

    public List<BoardDTO> findAll() {
        List<BoardEntity> boardEntityList = boardRepository.findAll();
        return boardEntityList.stream().map(BoardDTO::toBoardDTO).collect(Collectors.toList());
    }

    public BoardDTO findById(Long id) {
        Optional<BoardEntity> optionalBoardEntity = boardRepository.findById(id);
        return optionalBoardEntity.map(BoardDTO::toBoardDTO).orElse(null);
    }
    public List<BoardDTO> findByBookTitle(String bookTitle) {
        List<BoardEntity> entities = boardRepository.findByBookTitle(bookTitle);
        return entities.stream()
                .map(BoardDTO::fromEntity)
                .collect(Collectors.toList());
    }
    public BoardDTO update(BoardDTO boardDTO) {
        BoardEntity boardEntity = BoardEntity.toUpdateEntity(boardDTO);
        boardRepository.save(boardEntity);
        return findById(boardDTO.getId());
    }

    public void delete(Long id) {
        boardRepository.deleteById(id);
    }

    public Page<BoardDTO> paging(Pageable pageable) {
        int page = pageable.getPageNumber() - 1;
        int pageLimit = 5;
        Page<BoardEntity> boardEntities = boardRepository.findAll(PageRequest.of(page, pageLimit, Sort.by(Sort.Direction.DESC, "id")));
        return boardEntities.map(BoardDTO::toBoardDTO);
    }

    public List<BoardDTO> findByCategory(String genre) {
        List<BoardEntity> entities = boardRepository.findByBookCategoryName(genre);
        return entities.stream()
                .map(BoardDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public List<BoardDTO> findByBoardWriter(String boardWriter) {
        List<BoardEntity> entities = boardRepository.findByBoardWriter(boardWriter);
        return entities.stream().map(BoardDTO::toBoardDTO).collect(Collectors.toList());
    }


    public Map<String, Object> getImpressionDetails(Long id) {
        BoardEntity selectedImpression = boardRepository.findById(id).orElse(null);
        if (selectedImpression == null) {
            return Collections.emptyMap();
        }

        List<BoardEntity> relatedImpressions = boardRepository.findByBookTitle(selectedImpression.getBookTitle());

        Map<String, Object> result = new HashMap<>();
        result.put("selectedImpression", BoardDTO.toBoardDTO(selectedImpression));
        result.put("relatedImpressions", relatedImpressions.stream()
                .map(BoardDTO::toBoardDTO)
                .collect(Collectors.toList()));

        return result;
    }
}