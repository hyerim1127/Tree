package com.dimmunity.Tree.repository;

import com.dimmunity.Tree.entity.BoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<BoardEntity,Long> {
    //<> 안에 넣을 내용만 신경써주면 된다.
}
