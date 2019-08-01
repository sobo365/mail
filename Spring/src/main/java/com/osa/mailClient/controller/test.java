package com.osa.mailClient.controller;

import com.osa.mailClient.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class test {
    

    @GetMapping(value = "/hello")
    public @ResponseBody String test(){
        System.out.println("get");
        return "Hello";
    }
}
