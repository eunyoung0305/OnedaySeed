package com.store.onedaySeed.dto;

import com.store.onedaySeed.entity.User;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserDto {

    private String userId;

    @NotNull(message = "이름을 입력해주세요")
    private String userName;

    @NotNull(message = "핸드폰번호를 입력해주세요")
    private String phoneNum;

    @NotNull(message = "비밀번호를 입력해주세요")
    private String password;

    public UserDto(User user) {
        this.userId = user.getUserId();
        this.userName = user.getUserName();
        this.phoneNum = user.getPhoneNum();
        this.password = user.getPassword();
    }
}
