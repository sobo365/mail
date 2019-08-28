package com.osa.mailClient.service;

import com.osa.mailClient.entity.Contact;
import com.osa.mailClient.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ContactServiceInterface {
    List<Contact> findAllByuserContact(User userContact);
}
