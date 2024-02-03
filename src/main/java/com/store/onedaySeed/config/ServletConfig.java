package com.store.onedaySeed.config;

import com.store.onedaySeed.controller.formatter.LocalDateFormatter;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class ServletConfig implements WebMvcConfigurer {
    @Override
    public void addFormatters(FormatterRegistry registry){
        registry.addFormatter(new LocalDateFormatter());
    }


    //p.123
    @Override
    public void addCorsMappings(CorsRegistry registry){
        registry.addMapping("/**")
                .allowedOrigins("*") //"http://localhost:3000"
                .allowedMethods("HEAD","GET","POST","PUT","DELETE","OPTIONS")
                .maxAge(300)
                .allowedHeaders("Authorization","Cache-Control","Content-Type");
    }


    // allowedOrigins: 스프링부트 서버의 Origin은 'http://localhost:8080'
    //                 서버에 요청을 보낸 React의 Origin은'http://localhost:3000' 오리진 요청에 대한 허용

}
