package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import jakarta.persistence.Entity;

@SpringBootApplication
@ComponentScan(basePackages = {"com.example.demo", "user.*", "spring.conf"})
@EntityScan("user.bean")
@EnableJpaRepositories("user.dao")
public class Chapter05JpaReactApplication {

	public static void main(String[] args) {
		SpringApplication.run(Chapter05JpaReactApplication.class, args);
	}

}
