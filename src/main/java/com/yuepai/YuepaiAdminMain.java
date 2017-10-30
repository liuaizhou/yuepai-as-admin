package com.yuepai;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;
import org.springframework.cloud.netflix.feign.EnableFeignClients;
import org.springframework.cloud.netflix.hystrix.dashboard.EnableHystrixDashboard;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
@EnableCaching
@EnableFeignClients
@EnableCircuitBreaker
@EnableHystrixDashboard
public class YuepaiAdminMain {

    @Value("${jdbc.url}")
    private String jdbcUrl;

    @RequestMapping("/hello")
    public String hello(HttpServletRequest request, HttpServletResponse response) {
        return "The Current  jdbcUrl is " + jdbcUrl;
    }

    public static void main(String[] args) {
        SpringApplication.run(YuepaiAdminMain.class, args);
    }
}
