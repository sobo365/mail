package com.osa.mailClient.controller;

import com.osa.mailClient.dto.ContactDTO;
import com.osa.mailClient.dto.PhotoDTO;
import com.osa.mailClient.dto.ResponseMessageDTO;
import com.osa.mailClient.entity.Contact;
import com.osa.mailClient.entity.Photo;
import com.osa.mailClient.entity.User;
import com.osa.mailClient.service.PhotoService;
import com.osa.mailClient.service.UserService;
import com.osa.mailClient.service.ContactService;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileOutputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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

    @Autowired
    private PhotoService photoService;

    @PostMapping("/add")
    public ResponseEntity<?> addContact(@RequestBody Contact contact, @RequestParam("id") long userId, @RequestParam("photo")String photo){

        User user = userService.findById(userId);
        contact.setUserContact(user);



        Photo p = new Photo();

            p.setContactPhoto(contact);
            p.setPath(photo);
            photoService.save(p);


        contactService.save(contact);
        return ResponseEntity.ok(new ContactDTO(contact, new PhotoDTO(p)));
    }

    @RequestMapping(value = "/getContacts", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ContactDTO>> getAccounts(@RequestParam("id") long userId){
        User user = userService.findById(userId);
        List<Contact> contacts = contactService.findAllByuserContact(user);
        List<ContactDTO> contactsDTO = new ArrayList<>();
        for (Contact contact : contacts) {
            Photo p = photoService.getByContact(contact);
            PhotoDTO pdto = new PhotoDTO(new Photo());
            if(p != null){
                pdto.setData(p.getPath());
                pdto.setId(p.getId());
            }


            contactsDTO.add(new ContactDTO(contact, pdto));
        }
        return new ResponseEntity<>(contactsDTO, HttpStatus.OK);

    }

    @DeleteMapping("/deleteContact")
    public ResponseEntity<?> deleteContact(@RequestParam("contactId") long contactId){
        Contact c = contactService.getOne(contactId);
        contactService.delete(c);
        return ResponseEntity.ok(new ResponseMessageDTO(null));
    }
}
