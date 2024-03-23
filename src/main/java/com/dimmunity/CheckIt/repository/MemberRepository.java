package com.dimmunity.CheckIt.repository;

import com.dimmunity.CheckIt.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<MemberEntity,Long> {
}
