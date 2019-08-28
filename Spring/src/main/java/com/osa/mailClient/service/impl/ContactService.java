package com.osa.mailClient.service.impl;

import com.osa.mailClient.entity.Contact;
import com.osa.mailClient.entity.User;
import com.osa.mailClient.repository.ContactRepository;
import com.osa.mailClient.service.ContactServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactService implements ContactServiceInterface {

    @Autowired
    private ContactRepository contactRepository;

    @Override
    public List<Contact> findAllByuserContact(User userContact) {
        return contactRepository.findAllByuserContact((userContact));
    }
}
