package com.osa.mailClient.controller;

import com.osa.mailClient.dto.ResponseMessageDTO;
import com.osa.mailClient.dto.TagDTO;
import com.osa.mailClient.entity.Message;
import com.osa.mailClient.entity.Tag;
import com.osa.mailClient.entity.User;
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

    @Autowired
    private UserService userService;


    @RequestMapping(value = "/getTags", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getTags(@RequestParam("id") long id){
        User user = userService.findById(id);
        List<Tag> tags = tagService.findByuserTags(user);
        List<TagDTO> dtos = new ArrayList<>();
        for(Tag t : tags){
            dtos.add(new TagDTO((t)));
        }
        return new ResponseEntity<>(dtos, HttpStatus.OK);

    }

    @RequestMapping(value = "/newTag", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> newTag(@RequestParam("userId") long userId, @RequestParam("tagName") String tagName ){
        User user = userService.findById(userId);
        Tag tag = new Tag();
        tag.setName(tagName);
        tag.setUserTags(user);
        tagService.save(tag);
        ResponseEntity<?> re = getTags(user.getId());
        return re;
    }

    @RequestMapping(value = "/deleteTag", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteTag(@RequestParam("tagId") long tagId){
        Tag tag = tagService.findOne(tagId);
        tagService.Delete(tag);

        return new ResponseEntity<>(new ResponseMessageDTO(null), HttpStatus.OK);
    }

    @RequestMapping(value = "/deleteFromMessage", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteFromMessage(@RequestParam("tagId") long tagId, @RequestParam("messageId") long messageId){
        tagService.deleteMessageTag(messageId, tagId);
        return new ResponseEntity<>(new ResponseMessageDTO(null), HttpStatus.OK);
    }
}
