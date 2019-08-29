package com.osa.mailClient.controller;

import com.osa.mailClient.dto.ContactDTO;
import com.osa.mailClient.dto.ResponseMessageDTO;
import com.osa.mailClient.entity.Contact;
import com.osa.mailClient.entity.User;
import com.osa.mailClient.service.UserService;
import com.osa.mailClient.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin()
@RequestMapping("/contact")
public class ContactController {

    @Autowired
    private UserService userService;

    @Autowired
    private ContactService contactService;

    @PostMapping("/add")
    public ResponseEntity<?> addContact(@RequestBody Contact contact, @RequestParam("id") long userId){
        User user = userService.findById(userId);
        contact.setUserContact(user);
        contactService.save(contact);
        return ResponseEntity.ok(new ResponseMessageDTO(null));
    }

    @RequestMapping(value = "/getContacts", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ContactDTO>> getAccounts(@RequestParam("id") long userId){
        User user = userService.findById(userId);
        List<Contact> contacts = contactService.findAllByuserContact(user);
        List<ContactDTO> contactsDTO = new ArrayList<>();
        for (Contact contact : contacts) {
            contactsDTO.add(new ContactDTO(contact));
        }
        return new ResponseEntity<>(contactsDTO, HttpStatus.OK);

    }
}
