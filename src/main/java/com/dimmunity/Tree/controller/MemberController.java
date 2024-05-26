package com.dimmunity.Tree.controller;

import com.dimmunity.Tree.dto.MemberDTO;
import com.dimmunity.Tree.service.MemberService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    // 회원가입 페이지 출력 요청
    @GetMapping("/member/save")
    public String saveForm() {
        return "save";
    }

    @PostMapping("/member/save")    // name값을 requestparam에 담아온다
    public String save(@ModelAttribute MemberDTO memberDTO, Errors errors, Model model) {
        System.out.println("MemberController.save");
        System.out.println("MemberDTO= "+ memberDTO);
        memberService.save(memberDTO);
        return "login";
    }

    //로그인
    @GetMapping("/member/login")
    public String loginForm(){
        return "login";
    }
    @PostMapping("/member/login") // session : 로그인 유지
    public String login(@ModelAttribute MemberDTO memberDTO, HttpSession session) {
        MemberDTO loginResult = memberService.login(memberDTO);
        if (loginResult != null) {
            // login 성공-login한 이메일정보를 session에 담아줌
            session.setAttribute("loginEmail", loginResult.getMemberEmail());
            return "myPage";
        } else {
            // login 실패, 실패창 구현필요 /member/loginfail
            return "login";
        }
    }

    //회원리스트-필요없을듯
    @GetMapping("/member/")
    public String findAll(Model model) {
        List<MemberDTO> memberDTOList = memberService.findAll();
        // html로 가져갈 데이터->model 사용
        model.addAttribute("memberList", memberDTOList);
        return "list";
    }
    //회원조회
    @GetMapping("/member/{id}")
    public String findById(@PathVariable("id") Long id, Model model){
        MemberDTO memberDTO=memberService.findById(id);
        model.addAttribute("member", memberDTO);
        return "detail";
    }

    //회원탈퇴
    //@PathVariable("id") 명시해줘야함, spring MVC가 URL경로변수이름 자동인식못함
    @GetMapping("/member/delete/{id}") // /member/{id}로 할 수 있도록 공부
    public String deleteById(@PathVariable("id") Long id, RedirectAttributes redirectAttributes){
        memberService.deleteById(id);

        redirectAttributes.addFlashAttribute("message","계정 삭제가 완료되었습니다");
        return "redirect:/login"; // list 로 쓰면 껍데기만 보여짐
    }

    //회원정보수정
    @GetMapping("/member/update")
    public String updateForm(HttpSession session, Model model){
        String myEmail=(String) session.getAttribute("loginEmail");
        MemberDTO memberDTO=memberService.updateForm(myEmail);
        model.addAttribute("updateMember", memberDTO);
        return "update";
    }
    @PostMapping("/member/update")
    public String update(@ModelAttribute MemberDTO memberDTO){
        memberService.update(memberDTO);
        return "redirect:/member/" + memberDTO.getId();
        //정보가 수정완료된 나의 상세페이지를 띄워주기 위함
    }

    //로그아웃
    @GetMapping("/member/logout")
    public String logout(HttpSession session){
        session.invalidate();
        return "index";
    }

}
