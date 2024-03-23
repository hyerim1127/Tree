package com.dimmunity.CheckIt.service;

import com.dimmunity.CheckIt.dto.MemberDTO;
import com.dimmunity.CheckIt.entity.MemberEntity;
import com.dimmunity.CheckIt.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    public void save(MemberDTO memberDTO) {
        // repsitory의 save 메서드 호출
        MemberEntity memberEntity = MemberEntity.toMemberEntity(memberDTO);
        memberRepository.save(memberEntity);
        //Repository의 save메서드 호출 (조건. entity객체를 넘겨줘야 함)

    }


}
