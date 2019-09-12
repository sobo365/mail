package com.osa.mailClient.controller;

import com.osa.mailClient.dto.ResponseMessageDTO;
import com.osa.mailClient.dto.TagDTO;
import com.osa.mailClient.entity.Message;
import com.osa.mailClient.entity.Tag;
import com.osa.mailClient.service.MessageService;
import com.osa.mailClient.service.TagService;
import com.osa.mailClient.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin()
@RequestMapping("/tag")
public class TagController {

    @Autowired
    private TagService tagService;


    @RequestMapping(value = "/getAccounts", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAccounts(){
      //  User user = userService.findById(id);
        List<Tag> tags = tagService.findAll();
        List<TagDTO> dtos = new ArrayList<>();
        for(Tag t : tags){
            dtos.add(new TagDTO((t)));
        }
        return new ResponseEntity<>(dtos, HttpStatus.OK);

    }

    @RequestMapping(value = "/deleteFromMessage", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteFromMessage(@RequestParam("tagId") long tagId, @RequestParam("messageId") long messageId){
        tagService.deleteMessageTag(tagId, messageId);
        System.out.println("DELETE _-_-_-_-_-_-_-");
        return new ResponseEntity<>(new ResponseMessageDTO(null), HttpStatus.OK);
    }
}
