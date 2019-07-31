package com.osa.mailClient.service;

import com.osa.mailClient.entity.User;

import java.util.List;

public interface UserService {
    User findById(Long id);
    User findByUsername(String username);
    List<User> findAll ();
}
