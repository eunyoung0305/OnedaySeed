package com.store.onedaySeed.controller;

import com.store.onedaySeed.dto.UserLoginDto;
import com.store.onedaySeed.dto.UserMemberFormDto;
import com.store.onedaySeed.entity.User;
import com.store.onedaySeed.service.UserMemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping
@RequiredArgsConstructor
@Log4j2
public class UserMemberController {

    private final UserMemberService userMemberService;
    private final PasswordEncoder passwordEncoder;

    @GetMapping(value = "/api/userNew")
    @ResponseBody
    private String userNewGet(Model model){

        model.addAttribute("userMemberFormDto",new UserMemberFormDto());

        return "userNewGet";
    }


    @PostMapping("/api/userNew")
    public ResponseEntity<?> userNew(@RequestBody @Valid UserMemberFormDto userMemberFormDto,BindingResult bindingResult) {

        if(bindingResult.hasErrors()){ // 오류가 발생하였을 경우, 클라이언트에게 오류 메시지 전송
            Map<String, Object> errors = new HashMap<>();
            // 에러 메시지와 함께 alert 메시지 추가
            errors.put("alertMessage", "회원가입에 실패했습니다.");
            errors.put("errors", bindingResult.getAllErrors());

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
        }

        try {
            User user = User.createUser(userMemberFormDto,passwordEncoder);
            userMemberService.saveMember(user);
            // 수정 성공시, 클라이언트에게 성공 메시지 전송
            Map<String, String> successResponse = new HashMap<>();
            successResponse.put("successMessage", "회원가입 완료");
            successResponse.put("alertMessage", "회원가입 완료");

            return ResponseEntity.ok(successResponse);

        } catch (Exception e){
            Map<String, String> errors = new HashMap<>();
            // 에러 메시지와 함께 alert 메시지 추가
            errors.put("alertMessage", "회원가입에 실패했습니다.");
            errors.put("errorMessage", e.getMessage());

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
        }

    }

    @GetMapping("/api/userLogin")
    @ResponseBody
    public String loginPage()
    {
        return "login";
    }



    @PostMapping("/api/userLogin")
    public ResponseEntity<?> loginUserPost(@RequestBody @Valid UserLoginDto userLoginDto,BindingResult bindingResult) {

        if(bindingResult.hasErrors()){ // 오류가 발생하였을 경우, 클라이언트에게 오류 메시지 전송
            Map<String, Object> errors = new HashMap<>();
            // 에러 메시지와 함께 alert 메시지 추가
            errors.put("alertMessage", "로그인에 실패했습니다.");
            errors.put("errors", bindingResult.getAllErrors());

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
        }

        try {
            String userId = userLoginDto.getUserId();
            User user = userMemberService.findOne(userId);

            if (user == null) {
                // 아이디가 없는 경우 클라이언트에게 알림을 전송
                Map<String, String> errorMessage = new HashMap<>();
                errorMessage.put("alertMessage", "로그인에 실패했습니다.");
                errorMessage.put("errorMessage", "아이디가 없습니다.");
                return ResponseEntity.badRequest().body(errorMessage);
            }

            // 비밀번호를 검증
            if (!passwordEncoder.matches(userLoginDto.getPassword(), user.getPassword())) {
                // 비밀번호가 일치하지 않는 경우 클라이언트에게 알림을 전송
                Map<String, String> errorMessage = new HashMap<>();
                //errorMessage.put("alertMessage", "로그인에 실패했습니다.");
                errorMessage.put("errorMessage", "비밀번호가 일치하지 않습니다.");

                return ResponseEntity.badRequest().body(errorMessage);
            }

            // 로그인 성공시, 클라이언트에게 성공 메시지 전송
            Map<String, String> successResponse = new HashMap<>();
            successResponse.put("successMessage", "로그인 성공");
            successResponse.put("alertMessage", "로그인 성공");

            return ResponseEntity.ok(successResponse);

        } catch (Exception e) {
            // 에러 메시지와 함께 alert 메시지 추가
            Map<String, String> errors = new HashMap<>();
            errors.put("alertMessage", "로그인에 실패했습니다.");
            errors.put("errorMessage", e.getMessage());

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
        }
    }


}