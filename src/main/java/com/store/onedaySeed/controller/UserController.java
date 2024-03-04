package com.store.onedaySeed.controller;

import com.store.onedaySeed.dto.UserDto;
import com.store.onedaySeed.entity.User;
import com.store.onedaySeed.service.UserMemberService;
import com.store.onedaySeed.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Validated
public class UserController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    private String newUserId;


    // 로그인 된 유저 아이디 받기
    @PostMapping("/api/sendUserId")
    public ResponseEntity<?> sendUserId(@RequestBody Map<String, String> requestBody) {
        try {
            String userId = requestBody.get("userId");
            newUserId = userId;
            System.out.println("받은 사용자 ID: " + userId);
            return ResponseEntity.ok("사용자 ID 전송 성공");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // 프로필 조회
    @GetMapping("/api/user")
    public UserDto userDetail() {
        User user = userService.findOne(newUserId);
        System.out.println("받은 사용자 ID: " + newUserId);
        return new UserDto(user);
    }

    // 유저 정보 수정 // @Valid 의존성 추가하기
    @PostMapping("/api/user")
    public ResponseEntity<?> userUpdate(@RequestBody @Valid UserDto userDto, BindingResult bindingResult) {
        // @Valid로 쿼리문 유효성 검사 >> userDto

        if(bindingResult.hasErrors()){ // 오류가 발생하였을 경우, 클라이언트에게 오류 메시지 전송
            Map<String, Object> errors = new HashMap<>();
            // 에러 메시지와 함께 alert 메시지 추가
            errors.put("alertMessage", "변경사항 저장에 실패했습니다.");
            errors.put("errors", bindingResult.getAllErrors());

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
        }

        // 사용자 정보 업데이트
        try {
            String encodedPassword = passwordEncoder.encode(userDto.getPassword());
            userDto.setPassword(encodedPassword);

            userService.updateUser(userDto);

            // 수정 성공시, 클라이언트에게 성공 메시지 전송
            Map<String, String> successResponse = new HashMap<>();
            successResponse.put("successMessage", "새로운 정보가 저장되었습니다.");
            successResponse.put("alertMessage", "새로운 정보가 저장되었습니다.");

            return ResponseEntity.ok(successResponse);

        } catch (Exception e){
            Map<String, String> errors = new HashMap<>();
            // 에러 메시지와 함께 alert 메시지 추가
            errors.put("alertMessage", "변경사항 저장에 실패했습니다.");
            errors.put("errorMessage", e.getMessage());

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
        }
    }
}
