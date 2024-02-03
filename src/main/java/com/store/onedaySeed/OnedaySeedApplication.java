package com.store.onedaySeed;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@SpringBootApplication
public class OnedaySeedApplication {

	public static void main(String[] args) {
		SpringApplication.run(OnedaySeedApplication.class, args);
	}
	@GetMapping(value=
			{"/", "/about", "/user/login", "/user/new", "/host/login", "/host/new", "/myPage", "/host/myPage","/user", "/host", "/cart",
			"/order", "/lesson/main", "/lesson/list", "/lesson/detail","/lesson/new", "/lesson/modify/"})
	public String forward() {
		return "forward:/index.html";
	}
}
