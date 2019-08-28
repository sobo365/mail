package com.osa.mailClient.controller;

import com.osa.mailClient.dto.FolderDTO;
import com.osa.mailClient.dto.ResponseMessageDTO;
import com.osa.mailClient.entity.Account;
import com.osa.mailClient.entity.Folder;
import com.osa.mailClient.service.AccountService;
import com.osa.mailClient.service.FolderService;
import com.osa.mailClient.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@CrossOrigin()
@RequestMapping("/folders")
public class FolderController {

    @Autowired
    private FolderService folderService;

    @Autowired
    private AccountService accountService;

    @Autowired
    private MessageService messageService;


    @RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<FolderDTO>> getFolders(@RequestParam("id") int id){
        Account acc = accountService.findById(id);
        List<Folder> folders = folderService.findAllByAccountFolder(acc);
        List<FolderDTO> dtoFolders = new ArrayList<>();
        for(Folder f : folders){
            FolderDTO dto = new FolderDTO(f);
            dto.setMessageCount(messageService.countMessagesInFolder(f.getId()));
            dtoFolders.add(dto);
        }

        return new ResponseEntity<>(dtoFolders, HttpStatus.OK);

    }

    @RequestMapping(value = "/add", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addFolder(@RequestBody Folder folder, @RequestParam("accountId") int id) {
        List<String> folderNames = new ArrayList<String>(Arrays.asList("inbox", "outbox", "spam", "drafts"));
        if(folderNames.contains(folder.getName().trim().toLowerCase())){
            return ResponseEntity.ok(new ResponseMessageDTO("Invalid folder name!"));
        }

        Account acc = accountService.findById(id);
        folder.setAccountFolder(acc);
        folderService.save(folder);
        return ResponseEntity.ok(new ResponseMessageDTO(null));
    }

}
