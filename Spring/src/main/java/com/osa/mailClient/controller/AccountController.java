package com.osa.mailClient.controller;

import com.osa.mailClient.dto.AccountDTO;
import com.osa.mailClient.dto.ResponseMessageDTO;
import com.osa.mailClient.entity.Account;
import com.osa.mailClient.entity.Folder;
import com.osa.mailClient.entity.User;
import com.osa.mailClient.repository.FolderRepository;
import com.osa.mailClient.service.AccountService;
import com.osa.mailClient.service.FolderService;
import com.osa.mailClient.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin()
@RequestMapping("/account")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @Autowired
    private UserService userService;

    @Autowired
    private FolderService folderService;

    @PostMapping("/add")
    public ResponseEntity<?> addAccount(@RequestBody Account acc) {
        String[] folderNames = {"Inbox", "Outbox", "Drafts", "Spam"};
        accountService.save(acc);
        for(int i = 0; i < folderNames.length; i++){
            Folder defaultFolder = new Folder();
            defaultFolder.setName(folderNames[i]);
            defaultFolder.setAccountFolder(acc);
            folderService.save(defaultFolder);

        }

        return ResponseEntity.ok(new ResponseMessageDTO(null));

    }


    @RequestMapping(value = "/getAccounts", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<AccountDTO>> getAccounts(@RequestParam("id") long id){
        User user = userService.findById(id);
        List<Account> accounts = accountService.findAllByUser(user);
        List<AccountDTO> accountDTOS = new ArrayList<>();
        for (Account account : accounts
        ) {
            accountDTOS.add(new AccountDTO(account));
        }
        return new ResponseEntity<>(accountDTOS, HttpStatus.OK);

    }

    @RequestMapping(value = "/deleteAccount", method = RequestMethod.DELETE)
    public ResponseEntity<Boolean> deleteAccount(@RequestParam("id") long id) {
        try {
            accountService.remove(id);
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
    }


}
