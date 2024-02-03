package com.store.onedaySeed.controller;

import com.store.onedaySeed.dto.HostLoginDto;
import com.store.onedaySeed.dto.HostMemberFormDto;
import com.store.onedaySeed.dto.UserLoginDto;
import com.store.onedaySeed.dto.UserMemberFormDto;
import com.store.onedaySeed.entity.Host;
import com.store.onedaySeed.entity.User;
import com.store.onedaySeed.service.HostMemberService;
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
public class HostMemberController {


    private final HostMemberService hostMemberService;
    private final PasswordEncoder passwordEncoder;

    @GetMapping("/api/hostNew")
    @ResponseBody
    public String hostNew(Model model){

        model.addAttribute("hostMemberFormDto",new HostMemberFormDto());


        return "newHostGET";
    }

    @PostMapping ("/api/hostNew")
    public ResponseEntity<?> userNew(@RequestBody @Valid HostMemberFormDto hostMemberFormDto, BindingResult bindingResult) {

        if(bindingResult.hasErrors()){ // 오류가 발생하였을 경우, 클라이언트에게 오류 메시지 전송
            Map<String, Object> errors = new HashMap<>();
            // 에러 메시지와 함께 alert 메시지 추가
            errors.put("alertMessage", "회원가입에 실패했습니다.");
            errors.put("errors", bindingResult.getAllErrors());

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
        }

        try {
            Host host = Host.createHost(hostMemberFormDto,passwordEncoder);
            hostMemberService.saveMember(host);
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


    @GetMapping("/api/hostLogin")
    @ResponseBody
    public String loginPage()
    {
        return "login";
    }

    @PostMapping("/api/hostLogin")
    public ResponseEntity<?> loginUserPost(@RequestBody @Valid HostLoginDto hostLoginDto, BindingResult bindingResult) {

        if(bindingResult.hasErrors()){ // 오류가 발생하였을 경우, 클라이언트에게 오류 메시지 전송
            Map<String, Object> errors = new HashMap<>();
            // 에러 메시지와 함께 alert 메시지 추가
            errors.put("alertMessage", "로그인에 실패했습니다.");
            errors.put("errors", bindingResult.getAllErrors());

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
        }

        try {
            String hostNum = hostLoginDto.getHostNum();
            Host host = hostMemberService.findOne(hostNum);

            if (host == null) {
                // 사업자번호가 없는 경우 클라이언트에게 알림을 전송
                Map<String, String> errorMessage = new HashMap<>();
                errorMessage.put("alertMessage", "로그인에 실패했습니다.");
                errorMessage.put("errorMessage", "사업자번호가 없습니다.");
                return ResponseEntity.badRequest().body(errorMessage);
            }

            // 비밀번호를 검증
            if (!passwordEncoder.matches(hostLoginDto.getPassword(), host.getPassword())) {
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
            errors.put("alertMessage",  "로그인에 실패했습니다.");
            errors.put("errorMessage", e.getMessage());

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
        }
    }



}
