package com.store.onedaySeed.entity;

import com.store.onedaySeed.constant.Role;
import com.store.onedaySeed.dto.UserDto;
import com.store.onedaySeed.dto.UserMemberFormDto;
import lombok.*;

import jakarta.persistence.*;
import org.springframework.security.crypto.password.PasswordEncoder;

@Entity
@Builder
@Table(name="user")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class User extends BaseEntity{

    @Id
    @Column(name="user_id" ,unique = true)
    private String userId;

    @Column(nullable = false,name="user_name")
    private String userName;

    @Column(nullable = false,name="phone_num")
    private String phoneNum;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    public void updateUser(UserDto userDto) {
        this.userId = userDto.getUserId();
        this.userName = userDto.getUserName();
        this.phoneNum = userDto.getPhoneNum();
        this.password = userDto.getPassword();
    }

    public static User createUser(UserMemberFormDto userMemberFormDto,PasswordEncoder passwordEncoder){

        User user = new User();

        user.setUserId(userMemberFormDto.getUserId());
        user.setUserName(userMemberFormDto.getUserName());
        user.setPhoneNum(userMemberFormDto.getPhoneNum());
        String password = passwordEncoder.encode(userMemberFormDto.getPassword());
        user.setPassword(password);
//        user.setPassword(userMemberFormDto.getPassword());
        user.setRole(Role.USER);

        return user;
    }

}
