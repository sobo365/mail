package com.osa.mailClient.controller;

import com.osa.mailClient.dto.ContactDTO;
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

        System.out.println(photo.split(",")[0]);

        byte[] data = Base64.decodeBase64(photo);
        Photo p = new Photo();
        try{
            String filename = "./data/userPhotos/" + user.getUsername() + contact.getDisplayname();
            OutputStream stream = new FileOutputStream(filename);
            stream.write(data);
            p.setContactPhoto(contact);
            p.setPath(filename);
            photoService.save(p);

        }catch (Exception e){
            e.printStackTrace();
        }

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
