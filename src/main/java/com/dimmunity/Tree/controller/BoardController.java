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
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor

public class BoardController {
    private final BoardService boardService;

    @GetMapping("/board/bookSave")
    public String saveForm(){
        return "bookSave";
    }

    //post로 보냈기 때문에 postmapping 사용

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

    // 게시글 상세 조회
    @GetMapping("/board/{id}")
    public String findById(@PathVariable("id") Long id, Model model,
                           @PageableDefault(page=1) Pageable pageable){
        BoardDTO boardDTO = boardService.findById(id);


        model.addAttribute("board", boardDTO);
        model.addAttribute("page", pageable.getPageNumber());

        return "boardDetail";
    }

    // 게시글 수정
    @GetMapping("/board/phraseUpdate/{id}")
    public String updateForm(@PathVariable("id") Long id, Model model){
        BoardDTO boardDTO = boardService.findById(id);
        model.addAttribute("boardUpdate",boardDTO);
        return "phraseUpdate";
    }

    @PostMapping("/board/phraseUpdate")
    public String update(@ModelAttribute BoardDTO boardDTO, Model model) {
        BoardDTO board = boardService.update(boardDTO);
        model.addAttribute("board", board);
        return "redirect:/board/" + boardDTO.getId();
    }

    // 게시글 삭제
    @GetMapping("/board/delete/{id}")
    public String delete(@PathVariable("id") Long id){
        boardService.delete(id);
        return "redirect:/board";
    }

    // 페이징 처리
    @GetMapping("/board")
    public List<BoardDTO> findAll(){
        return boardService.findAll();
    }


    // 카테고리별 인상깊은 구절 매핑
    @GetMapping("/board/genre")
    public String getBooksByCategory(@RequestParam("genre") String category, Model model) {
        List<BoardDTO> bookList = boardService.findByCategory(category);
        model.addAttribute("books", bookList);
        return "categorySearchResult";
    }

    @GetMapping("/member/{boardWriter}")
    public List<BoardDTO> getImpressionsByUser(@PathVariable("boardWriter") String boardWriter) {
        return boardService.findByBoardWriter(boardWriter);
    }

}

