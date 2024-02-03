package com.store.onedaySeed.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;


@Getter
@Setter
public class UserMemberFormDto {

    private String userId;

    private String userName;

    private String phoneNum;

    private String password;


}
