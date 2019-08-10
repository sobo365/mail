package com.osa.mailClient.service;

import com.osa.mailClient.entity.Account;
import com.osa.mailClient.entity.User;
import com.osa.mailClient.repository.AccountRepository;
import com.osa.mailClient.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.security.auth.login.AccountException;
import java.util.List;

@Service
public class AccountService implements AccountServiceInterface{

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public Account save(Account account) {
        return accountRepository.save(account);
    }

    @Override
    public List<Account> findAllByUser(User user) {
        return accountRepository.findAllByUser(user);
    }

    @Override
    public void remove(long account_id) {
        accountRepository.deleteById(account_id);
    }
}
