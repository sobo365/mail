package com.osa.mailClient.controller;

import com.osa.mailClient.dto.ResponseMessageDTO;
import com.osa.mailClient.dto.RuleDTO;
import com.osa.mailClient.entity.Account;
import com.osa.mailClient.entity.Folder;
import com.osa.mailClient.entity.Message;
import com.osa.mailClient.entity.Rule;
import com.osa.mailClient.enums.Condition;
import com.osa.mailClient.enums.Operation;
import com.osa.mailClient.service.AccountService;
import com.osa.mailClient.service.FolderService;
import com.osa.mailClient.service.MessageService;
import com.osa.mailClient.service.RuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin()
@RequestMapping("/rule")
public class RuleController {

    @Autowired
    private FolderService folderService;

    @Autowired
    private RuleService ruleService;

    @Autowired
    private AccountService accountService;

    @Autowired
    private MessageService messageService;

    @PostMapping("/add")
    public ResponseEntity<?> addRule(@RequestParam("folderId") long folderId, @RequestParam("condition") short condition, @RequestParam("operation") short operation, @RequestParam("value") String value){
        Folder folder = folderService.findById(folderId);

        Rule rule = new Rule();
        rule.setDestination(folder);
        rule.setCondition(condition);
        rule.setOperation(operation);
        rule.setValue(value);

        ruleService.Save(rule);

        RuleDTO dto = new RuleDTO(rule);

        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @GetMapping("/folderRules")
    public ResponseEntity<?> folderRules(@RequestParam("folderId") long folderId){
        Folder folder = folderService.findById(folderId);
        List<Rule> rules = ruleService.findByDestination(folder);
        List<RuleDTO> dtos = new ArrayList<>();
        for(Rule r : rules){
            dtos.add(new RuleDTO(r));
        }
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @DeleteMapping("/deleteRule")
    public ResponseEntity<?> deleteRule(@RequestParam("ruleId") long ruleId){
        Rule rule = ruleService.findOne(ruleId);
        ruleService.Delete(rule);
        return new ResponseEntity<>(new ResponseMessageDTO(null), HttpStatus.OK);
    }

    @GetMapping("/applyRule")
    public ResponseEntity<?> applyRule(@RequestParam("ruleId") long ruleId, @RequestParam("accountId") long accountId){
        Rule rule = ruleService.findOne(ruleId);
        Condition condition = Condition.valueOf(rule.getCondition());
        Operation operation = Operation.valueOf(rule.getOperation());
        List<Message> messages = messageService.findByAccountId(accountId);

        if(condition.equals(Condition.SUBJECT)) {
            for (Message m : messages) {
                if (m.getSubject().toLowerCase().equals(rule.getValue().toLowerCase())) {
                    handleOperation(operation, rule, m);
                }
            }
        }else if(condition.equals(Condition.FROM)){
            for(Message m : messages){
                if(m.getFrom().toLowerCase().equals(rule.getValue().toLowerCase())){
                    handleOperation(operation, rule, m);
                }
            }
        }else if(condition.equals(Condition.CC)){
            for(Message m: messages){
                if(m.getCc().toLowerCase().equals(rule.getValue().toLowerCase())){
                    handleOperation(operation, rule, m);
                }
            }
        }else if(condition.equals(Condition.TO)){
            for(Message m: messages){
                if(m.getTo().toLowerCase().equals(rule.getValue().toLowerCase())){
                    handleOperation(operation, rule, m);
                }
            }
        }


        return new ResponseEntity<>(new ResponseMessageDTO(null), HttpStatus.OK);
    }

    public void handleOperation(Operation operation, Rule rule, Message m){
        if(operation.equals(Operation.MOVE)){
            m.setInFolder(rule.getDestination());
            messageService.save(m);
            return;
        }else if(operation.equals(Operation.DELETE) && m.getInFolder().getId() == rule.getDestination().getId()){
            messageService.delete(m);
            return;
        }else if(operation.equals(Operation.COPY)){
            Message message = new Message();
            message.setInFolder(rule.getDestination());
            message.setReceived(m.isReceived());
            message.setUnread(m.isUnread());
            message.setDateTime(m.getDateTime());
            message.setBcc(m.getBcc());
            message.setCc(m.getCc());
            message.setContent(m.getContent());
            message.setSubject(m.getSubject());
            message.setTo(m.getTo());
            message.setFrom(m.getFrom());
            message.setAccountMessage(m.getAccountMessage());
            messageService.save(message);
            return;
        }
    }
}
