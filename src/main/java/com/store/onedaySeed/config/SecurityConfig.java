package com.store.onedaySeed.config;

//import com.store.onedaySeed.repository.security.filter.JWTCheckFilter;
//import com.store.onedaySeed.repository.security.handler.APILoginFailHandler;
//import com.store.onedaySeed.repository.security.handler.APILoginSuccessHandler;
//import com.store.onedaySeed.repository.security.handler.CustomAccessDeniedHandler;
import com.store.onedaySeed.service.HostMemberService;
import com.store.onedaySeed.service.UserMemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@Log4j2
@RequiredArgsConstructor
//@EnableWebSecurity
public class SecurityConfig {
    @Autowired//의존성 주입
    UserMemberService userMemberService;

//    @Autowired
//    HostMemberService hostMemberService;


//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//       log.info("-------security info-------");
//
//       http.cors(httpSecurityCorsConfigurer -> {
//           httpSecurityCorsConfigurer.configurationSource(corsConfigurationSource());
//       });
//
//       http.sessionManagement(sessionConfig -> sessionConfig.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
//
//       http.csrf(config -> config.disable()); //// 외부 POST 요청을 받아야하니 csrf는 꺼준다.
//
////       http.formLogin(config->{config.loginPage("/api/user/login");
////           config.successHandler(new APILoginSuccessHandler());
////           config.failureHandler(new APILoginFailHandler());
////       });
//
////       http.addFilterBefore(new JWTCheckFilter(),
////               UsernamePasswordAuthenticationFilter.class); //JWT 체크
//
//        http.exceptionHandling(config -> {config.accessDeniedHandler(new CustomAccessDeniedHandler());
//
//        });
//
//        return http.build();
//    }

//    @Bean
//    public CorsConfigurationSource corsConfigurationSource(){
//        CorsConfiguration configuration = new CorsConfiguration();
//
//        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
////        configuration.setAllowedOrigins(List.of("http://localhost:3000"));
//        configuration.setAllowedMethods(Arrays.asList("HEAD","GET","POST","PUT","DELETE"));
//        configuration.setAllowedHeaders(Arrays.asList("Authorization","Cache-Control","Context-Type"));
////        configuration.setAllowedHeaders(List.of("*"));
//        configuration.setAllowCredentials(true);
//
//
//        // setAllowedOrigins() : 허용할 URL
//        // setAllowedMethods() : 허용할 Http Method
//        // setAllowedHeaders() : 허용할 Header
//
////        /* 응답 헤더 설정 추가*/
////        configuration.setExposedHeaders(Arrays.asList("Authorization", "Authorization-refresh"));
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**",configuration);
//
//        return source;
//    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

}
