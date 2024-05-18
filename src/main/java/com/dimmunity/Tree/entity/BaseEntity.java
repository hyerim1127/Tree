package com.dimmunity.Tree.entity;

// 생성시, 수정시에 찍히는 시간 관리하기 위한 entity

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@Getter

public class BaseEntity {
    // 생성됐을 때 시간을 체크
    @CreationTimestamp
    // 수정시에는 관여를 안하게끔
    @Column(updatable = false)
    private LocalDateTime createdTime;

    // 업데이트 발생했을 때 시간을 체크크
    @UpdateTimestamp
    // 입력시에는 관여를 안하게끔
    @Column(insertable = false)
    private LocalDateTime updatedTime;
    

}
