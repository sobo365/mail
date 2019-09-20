package com.osa.mailClient.controller;

import com.osa.mailClient.dto.ResponseMessageDTO;
import com.osa.mailClient.dto.RuleDTO;
import com.osa.mailClient.entity.Folder;
import com.osa.mailClient.entity.Rule;
import com.osa.mailClient.enums.Condition;
import com.osa.mailClient.enums.Operation;
import com.osa.mailClient.service.FolderService;
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
}
