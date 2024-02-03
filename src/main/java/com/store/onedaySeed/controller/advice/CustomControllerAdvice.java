//package com.store.onedaySeed.controller.advice;
//
//import com.store.onedaySeed.util.JWTException;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.MethodArgumentNotValidException;
//import org.springframework.web.bind.annotation.ExceptionHandler;
//import org.springframework.web.bind.annotation.RestControllerAdvice;
//
//import java.nio.file.NoSuchFileException;
//import java.util.Map;
//import java.util.NoSuchElementException;
//
//@RestControllerAdvice
//public class CustomControllerAdvice{
//
//    @ExceptionHandler(NoSuchFileException.class)
//    protected ResponseEntity<?> notExist(NoSuchElementException e){
//        String msg = e.getMessage();
//
//        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("msg",msg));
//    }
//
//
//    @ExceptionHandler(MethodArgumentNotValidException.class)
//    protected ResponseEntity<?> handleIllegalArgumentException(MethodArgumentNotValidException e){
//        String msg = e.getMessage();
//
//        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(Map.of("msg",msg));
//    }
//
//
//    @ExceptionHandler(JWTException.class)
//    protected ResponseEntity<?> handleJWTException(JWTException e){
//        String msg = e.getMessage();
//
//        return ResponseEntity.ok().body(Map.of("error",msg));
//    }
//
//    //p.344 p.116
//
//}
//
//
//
//
//
