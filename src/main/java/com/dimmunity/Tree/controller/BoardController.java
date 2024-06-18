package com.dimmunity.Tree.controller;

import com.dimmunity.Tree.dto.BoardDTO;
import com.dimmunity.Tree.dto.BookDTO;
import com.dimmunity.Tree.entity.BoardEntity;
import com.dimmunity.Tree.service.BoardService;
import com.dimmunity.Tree.service.BookService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.hibernate.query.criteria.JpaCriteriaUpdate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor

public class BoardController {
    private final BoardService boardService;

    @GetMapping("/board/bookSave")
    public String saveForm(){
        return "bookSave";
    }

    @PostMapping("/board/bookSave")
    public String save(@RequestBody BoardDTO boardDTO, HttpSession session){
        String memberEmail = (String) session.getAttribute("loginEmail");
        if (memberEmail != null) {
            String boardWriter = memberEmail.split("@")[0];
            boardDTO.setBoardWriter(boardWriter);
        }
        boardService.save(boardDTO); // board bookSave 완료
        return "redirect:/board";
    }

    @GetMapping("board/{id}")
    public BoardDTO findById(@PathVariable("id") Long id){
        return boardService.findById(id);
    }


    // 특정 구절 조회 및 동일한 책에 대한 다른 구절들 조회
    @GetMapping("board/details/{id}")
    public ResponseEntity<Map<String, Object>> getImpressionDetails(@PathVariable("id") Long id) {
        BoardDTO selectedImpression = boardService.findById(id);
        if (selectedImpression == null) {
            return ResponseEntity.notFound().build();
        }
        List<BoardDTO> relatedImpressions = boardService.findByBookTitle(selectedImpression.getBookTitle());
        Map<String, Object> response = new HashMap<>();
        response.put("selectedImpression", selectedImpression);
        response.put("relatedImpressions", relatedImpressions);

        return ResponseEntity.ok(response);
    }


    // 게시글 수정
    @PutMapping("/board/phraseUpdate/{id}")
    public String updateForm(@PathVariable("id") Long id, Model model){
        BoardDTO boardDTO = boardService.findById(id);
        model.addAttribute("boardUpdate",boardDTO);
        return "phraseUpdate";
    }

    @PostMapping("/board/phraseUpdate/{id}")
    public String update(@ModelAttribute BoardDTO boardDTO, Model model) {
        BoardDTO board = boardService.update(boardDTO);
        model.addAttribute("board", board);
        return "redirect:/board/" + boardDTO.getId();
    }

    // 게시글 삭제
    @DeleteMapping("/board/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") Long id){
        boardService.delete(id);
        return ResponseEntity.ok("게시글이 삭제되었습니다.");
    }

    // 페이징 처리
    @GetMapping("/board")
    public List<BoardDTO> findAll(){
        return boardService.findAll();
    }


    // 카테고리별 인상깊은 구절 매핑
    @GetMapping("/board/genre")
    public List<BoardDTO> getBooksByCategory(@RequestParam("genre") String category) {
        String decodedCategory = URLDecoder.decode(category, StandardCharsets.UTF_8);
        return boardService.findByCategory(decodedCategory);
    }

    @GetMapping("/member/{boardWriter}")
    public List<BoardDTO> getImpressionsByUser(@PathVariable("boardWriter") String boardWriter) {
        return boardService.findByBoardWriter(boardWriter);
    }

}

