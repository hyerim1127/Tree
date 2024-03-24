package com.dimmunity.Tree.repository;

import com.dimmunity.Tree.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

//인자: 다룰엔티티, 엔티티의 pk타입
public interface MemberRepository extends JpaRepository<MemberEntity,Long> {
   //이메일로 회원정보 조회(select * from member_table where member_email=?)
    Optional<MemberEntity> findByMemberEmail(String memberEmail);
}


