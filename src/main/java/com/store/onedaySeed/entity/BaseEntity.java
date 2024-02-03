package com.store.onedaySeed.entity;

import jakarta.persistence.*;
import lombok.Getter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@EntityListeners(value = {AuditingEntityListener.class}) // 해당 클래스에 Auditing 기능을 포함하여 등록일, 수정일 등을 반영
@MappedSuperclass
//상속 받는 자식 클래스에게 매핑 정보 속성만 제공하고 싶을때 사용,
//부모 클래스로부터 엔티티 정보 이외의 클래스를 상속 받기 위해 사용
public abstract class BaseEntity extends BaseTimeEntity{

    @CreatedBy
    @Column(updatable = false) //생성자는 수정되지 않음으로 updatable = false
    private String createdBy;

    @LastModifiedBy
    private String modifiedBy;
}
