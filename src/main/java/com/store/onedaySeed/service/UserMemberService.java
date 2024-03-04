package com.store.onedaySeed.service;

import com.store.onedaySeed.dto.UserMemberFormDto;
import com.store.onedaySeed.entity.User;
import com.store.onedaySeed.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Service
@Transactional
@RequiredArgsConstructor
public class UserMemberService implements UserDetailsService {

    // UserMemberRepository => UserRepository로 통합

    private final UserRepository userRepository;


    public User findOne(String userId) {
        return userRepository.findById(userId).orElseThrow(NullPointerException::new);
        // id에 해당하는 user가 repository에 존재하지 않을 경우 NullPointerException 에러 핸들링
    }


    public void saveMember(User user){

        validateDuplicateUser(user);

        userRepository.save(user);
    }

    //가입된 회원인지 확인(유효성 검증)
    public void validateDuplicateUser(User user){
        User findUser = userRepository.findByUserId(user.getUserId());
        if(findUser != null){
            throw new IllegalArgumentException("이미 가입된 회원입니다.");
        }
    }

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {

        User user = userRepository.findByUserId(userId);

        if(user == null)
            throw new UsernameNotFoundException(userId);

        return (UserDetails) User.builder()
                .userName(user.getUserId())
                .password(user.getPassword())
                .build();

    }




}
