package com.osa.mailClient.service;

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

    @Override
    public Contact save(Contact contact) {
        return contactRepository.save(contact);
    }

    @Override
    public void delete(Contact contact) {
        contactRepository.delete(contact);
    }

    @Override
    public Contact getOne(long id) {
        return contactRepository.getOne(id);
    }
}
