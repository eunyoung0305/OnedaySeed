package com.store.onedaySeed.entity;

//import jakarta.persistence.Column;
//import jakarta.persistence.EntityListeners;
//import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.*;
import java.time.LocalDateTime;
//생성 시간과 수정 시간

// @MappedSuperclass
// 엔티티 종류에 상관없이 공통으로 가지고 있어야 하는 정보( ex.생성시간, 수정시간 등 )
// 공통 클래스로 추출하고 이를 상속받는 방식으로 구현할 때 사용
// 엔티티는 엔티티만 상속 받을 수 있기때문에 엔티티가 아닌 클래스를 상속받기 위하여 사용
// 이건 엔티티도 아니고 테이블과의 매핑도 아니다. 단순히 공통으로 사용하는 매핑 정보를 저장하는 역활

@Getter
@Setter
@EntityListeners(value = {AuditingEntityListener.class})//Audit 적용
@MappedSuperclass// 공통 매핑 정보가 필요할때 상속받는 자식 클래스에만 매핑정보 저장

public abstract class BaseTimeEntity {

    @CreatedDate// 엔티티 생성시 시간 자동 저장
    @Column(updatable = false)
    private LocalDateTime regTime;

    @LastModifiedDate// 엔티티값을 변경시 변경시간 자동저장
    private LocalDateTime updateTime;

}
