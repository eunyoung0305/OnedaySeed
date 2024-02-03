//package com.store.onedaySeed.controller;
//
//import com.store.onedaySeed.dto.UserMemberFormDto;
//import com.store.onedaySeed.entity.User;
//import com.store.onedaySeed.service.UserMemberService;
//import jakarta.transaction.Transactional;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.test.context.TestPropertySource;
//import org.springframework.test.web.servlet.MockMvc;
//
//import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestBuilders.formLogin;
//
//@SpringBootTest
//@AutoConfigureMockMvc
//@Transactional
//@TestPropertySource(locations = "classpath:application.yml")
//public class UserMemberController {
//
//    @Autowired
//    private UserMemberService userMemberService;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    public User createUser(String userId, String userPassword){
//        UserMemberFormDto userMemberFormDto = new UserMemberFormDto();
//        userMemberFormDto.setUserId(userId);
//        userMemberFormDto.setUserName("길동이");
//        userMemberFormDto.setUserPassword(userPassword);
//        userMemberFormDto.setUserPhoneNum("010123456789");
//
//        User user = User.createUser(userMemberFormDto, passwordEncoder);
//
//        return userMemberService.saveMember(user);
//    }
//
//
//
//    @DisplayName("로그인 성공 테스트")
//    @Test
//    void loginSuccessTest() throws Exception{
//
//        String userId = "gogo123";
//        String userPassword = "123456789";
//        this.createUser(userId,userPassword);
//        mockMvc.perform(formLogin().userParameter("userId")
//                .loginProcessingUrl("/user/login")
//                .user(userId).password(userPassword));
//        }
//
//
//    @DisplayName("로그인 실패 테스트")
//    @Test
//    void loginFailTest() throws Exception{
//
//        String userId = "xxxx00";
//        String userPassword = "123456789";
//        this.createUser(userId,userPassword);
//        mockMvc.perform(formLogin().userParameter("userId")
//                .loginProcessingUrl("/user/login/error")
//                .user(userId).password("789456269"));
//    }
//
//    @Test
//    void loginError(){}
//
//}
//
