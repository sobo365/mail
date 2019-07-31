package com.osa.mailClient.controller;

import com.osa.mailClient.entity.User;
import com.osa.mailClient.entity.UserTokenState;
import com.osa.mailClient.security.TokenHelper;
import com.osa.mailClient.security.auth.JwtAuthenticationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


import java.io.IOException;



@RestController
@RequestMapping(value = "/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenHelper tokenHelper;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody JwtAuthenticationRequest tokenRequest) throws AuthenticationException, IOException {
        UsernamePasswordAuthenticationToken authenticationRequest = new UsernamePasswordAuthenticationToken(tokenRequest.getUsername(), tokenRequest.getPassword());

        final Authentication authentication;

        try {
            authentication = authenticationManager.authenticate(authenticationRequest);
        } catch (org.springframework.security.core.AuthenticationException ex) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = (User) authentication.getPrincipal();

        String token = tokenHelper.generateToken(user.getUsername());
        long expiresIn = tokenHelper.getExiprationDate(token);

        UserTokenState token_response = new UserTokenState(token, expiresIn);

        return ResponseEntity.ok(token_response);
    }

}
