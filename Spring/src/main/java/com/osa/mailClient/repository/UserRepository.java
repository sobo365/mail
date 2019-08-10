package com.osa.mailClient.repository;

import com.osa.mailClient.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username );
    User findById(long id);


}

