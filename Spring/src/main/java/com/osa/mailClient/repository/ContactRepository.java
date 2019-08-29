package com.osa.mailClient.repository;

import com.osa.mailClient.entity.Account;
import com.osa.mailClient.entity.Contact;
import com.osa.mailClient.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ContactRepository extends JpaRepository<Contact, Long> {

    List<Contact> findAllByuserContact(User userContact);
}
