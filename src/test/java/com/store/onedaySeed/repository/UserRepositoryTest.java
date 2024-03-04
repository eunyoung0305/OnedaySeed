//package com.store.onedaySeed.repository;
//
//import com.store.onedaySeed.constant.Role;
//import com.store.onedaySeed.entity.User;
//
////import lombok.extern.log4j.Log4j2;
//import lombok.extern.log4j.Log4j2;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.security.crypto.password.PasswordEncoder;
//
//@Log4j2
//@SpringBootTest
//public class UserRepositoryTest {
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    @Test
//    public void testInsertUserMember(){
//
//        for(long i =0; i < 10; i++){
//
//            User user = User.builder()
//                    .userId("user"+i)
//                    .password(passwordEncoder.encode("1111"))
//                    .userName("User"+i)
//                    .phoneNum("010423512"+i)
//                    .role(Role.USER)
//                    .build();
//
//            userRepository.save(user);
//
//        }
//    }
//
//    //user 생성 되는지 확인
//
//    @Test
//    public void testRead(){
//        String userId = "user3";
//
//        User userInfo = userRepository.findByUserId(userId);
//
//        log.info("------");
//        log.info(userInfo);
//    }
//
//
//}
