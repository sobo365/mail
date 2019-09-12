package com.osa.mailClient.controller;

import com.osa.mailClient.dto.AttachmentDTO;
import com.osa.mailClient.dto.MessageDTO;
import com.osa.mailClient.dto.ResponseMessageDTO;
import com.osa.mailClient.dto.TagDTO;
import com.osa.mailClient.entity.*;
import com.osa.mailClient.mailUtil.MailReceiver;
import com.osa.mailClient.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.*;


@RestController
@CrossOrigin()
@RequestMapping("/mail")
public class MailController {

    @Autowired
    private MessageService messageService;

    @Autowired
    private MailReceiver mailReceiver;

    @Autowired
    private AccountService accountService;

    @Autowired
    private FolderService folderService;

    @Autowired
    private AttachmentService attachmentService;

    @Autowired
    private TagService tagService;

    @PostMapping("/update")
    public ResponseEntity<ResponseMessageDTO> updateMail(@RequestParam("messageId") long messageId, @RequestParam("folderId") long folderId ){
        Message message = messageService.findById(messageId);
        Folder folder = folderService.findById(folderId);
        message.setInFolder(folder);
        messageService.save(message);
        return new ResponseEntity<>(new ResponseMessageDTO(null), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<MessageDTO>> getMails(@RequestParam("id") int id, @RequestParam("filter") String filter){
        Account acc = accountService.findById(1);

        List<Message> messages = messageService.findByAccountId(id);
        List<Attachment> attachments = attachmentService.findAll();

        List<MessageDTO> messgeDTOS = new ArrayList<>();
        if(filter.equals("") || filter == null){
            for(Message m : messages){

                messgeDTOS.add(new MessageDTO(m));
            }
        }else{
            for(Message m : messages){
                if(m.getContent().toLowerCase().startsWith(filter.toLowerCase())){
                    messgeDTOS.add(new MessageDTO(m));
                }else if(m.getFrom().toLowerCase().startsWith(filter.toLowerCase())){
                    messgeDTOS.add(new MessageDTO(m));
                }else if(m.getSubject().toLowerCase().startsWith(filter.toLowerCase())){
                    messgeDTOS.add(new MessageDTO(m));
                }else if(m.getTo().toLowerCase().startsWith(filter.toLowerCase())){
                    messgeDTOS.add(new MessageDTO(m));
                }

            }
        }

        return new ResponseEntity<>(messgeDTOS, HttpStatus.OK);
    }

    @RequestMapping(value = "/getByFolder", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<MessageDTO>> inbox(@RequestParam("accountId") long accountId, @RequestParam("folderId") long folderId, @RequestParam("filter") String filter){
        Account acc = accountService.findById(accountId);
        List<Message> messages = messageService.findAllByAccountIdFolder(accountId, folderId);
        List<MessageDTO> messgeDTOS = new ArrayList<>();

        if(filter.equals("") || filter == null){
            for(Message m : messages){
                messgeDTOS.add(new MessageDTO(m));
            }
        }else{
            for(Message m : messages){
                if(m.getContent().toLowerCase().startsWith(filter.toLowerCase())){
                    messgeDTOS.add(new MessageDTO(m));
                }else if(m.getFrom().toLowerCase().startsWith(filter.toLowerCase())){
                    messgeDTOS.add(new MessageDTO(m));
                }else if(m.getSubject().toLowerCase().startsWith(filter.toLowerCase())){
                    messgeDTOS.add(new MessageDTO(m));
                }else if(m.getTo().toLowerCase().startsWith(filter.toLowerCase())){
                    messgeDTOS.add(new MessageDTO(m));
                }

            }
        }
        return new ResponseEntity<>(messgeDTOS, HttpStatus.OK);
    }

    @RequestMapping(value = "/check", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseMessageDTO> newMailCheck(@RequestParam("id") int id){
        Account acc = accountService.findById(1);

        mailReceiver.checkMail("pop.gmail.com", "pop3", "testpmsu@gmail.com", "TestPMSU1", acc);


        List<Message> messages = messageService.findByAccountId(id);
        for(Message m : messages){
            if(!m.isReceived()){
                m.setReceived(true);
                messageService.save(m);
                return new ResponseEntity<>(new ResponseMessageDTO("You have a new message!"), HttpStatus.OK);

            }

        }

        return new ResponseEntity<>(new ResponseMessageDTO(null), HttpStatus.OK);

    }

    @RequestMapping(value = "/read", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map> readMessage(@RequestParam("id") int id){
        Message message = messageService.findById(id);
        message.setUnread(false);
        messageService.save(message);


        List<Attachment> attachments = attachmentService.findByMessage(message);
        List<AttachmentDTO> dtos = new ArrayList<>();
        for(Attachment att : attachments){
            dtos.add(new AttachmentDTO(att));
        }

        List<Tag> tags  = tagService.findByMessages(message);
        List<TagDTO> tagDtos = new ArrayList<>();
        for(Tag t: tags){
            tagDtos.add(new TagDTO(t));
        }
        Map <String, List> ret = new HashMap<>();
        ret.put("Attachments", dtos);
        ret.put("Tags", tagDtos);
        return new ResponseEntity<>(ret,  HttpStatus.OK);
    }

    @RequestMapping(value = "/setTag", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> setTag(@RequestParam("messageId") long messageId, @RequestParam("tagId") long tagId){
        Message message = messageService.findById(messageId);
        Tag tag = tagService.findOne(tagId);
        tag.getMessagesTags().add(message);
        message.getTagsInMessages().add(tag);
        messageService.save(message);
        tagService.save(tag);
        return new ResponseEntity<>(new ResponseMessageDTO(null), HttpStatus.OK);
    }


}