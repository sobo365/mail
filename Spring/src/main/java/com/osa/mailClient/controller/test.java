package com.osa.mailClient.controller;

import com.osa.mailClient.dto.ResponseMessageDTO;
import com.osa.mailClient.entity.User;
import com.osa.mailClient.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin()
@RequestMapping("/api")
public class test {


    @PostMapping("/hello")
    public ResponseEntity<?> registerUser() {
        return ResponseEntity.ok(new ResponseMessageDTO("ok"));

    }
}
