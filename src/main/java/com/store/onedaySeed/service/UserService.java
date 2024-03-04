package com.store.onedaySeed.service;


import com.store.onedaySeed.dto.UserDto;
import com.store.onedaySeed.entity.User;
import com.store.onedaySeed.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import jakarta.persistence.EntityNotFoundException;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    // 프로필 조회
    public User findOne(String userId) {
        return userRepository.findById(userId).orElseThrow(NullPointerException::new);
        // id에 해당하는 user가 repository에 존재하지 않을 경우 NullPointerException 에러 핸들링
    }

    // 프로필 수정
    @Transactional // 이게 없으면 영속성 컨텍스트와 트랜잭션 처리가 이루어지지 않음
    // 즉, JPA가 제대로 실행되지 않음
    // JPA에서 영속성 컨텍스트는 엔티티 객체들의 상태를 추적하고 데이터베이스와의 통신을 관리하기 때문에
    // @Transactional 반드시 필요
    public void updateUser(UserDto userDto) throws EntityNotFoundException {
        // Optional은 값이 존재할 수도 있고, 존재하지 않을 수도 있는 컨테이너 타입
        Optional<User> optionalUser = userRepository.findById(userDto.getUserId());

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setUserName(userDto.getUserName());
            user.setPhoneNum(userDto.getPhoneNum());
            user.setPassword(userDto.getPassword());

            userRepository.save(user);

        } else {
            throw new EntityNotFoundException("User not found");
        }
    }

}
