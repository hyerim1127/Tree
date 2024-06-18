package com.dimmunity.Tree.repository;

import com.dimmunity.Tree.dto.BoardDTO;
import com.dimmunity.Tree.entity.BoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<BoardEntity, Long> {
    List<BoardEntity> findByBookCategoryName(String bookCategoryName);
}

