package com.osa.mailClient.service;

import com.osa.mailClient.entity.Account;
import com.osa.mailClient.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AccountServiceInterface {
    Account save(Account account);
    List<Account> findAllByUser(User user);
    void remove(long account_id);
    Account findById(long id);
}
