package com.osa.mailClient.service;

import com.osa.mailClient.entity.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public interface UserServiceInterface extends UserDetailsService {

    User findById(long id);

    User findByUsername(String username);

    User save(User user);

    @Override
    UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;
}
