package com.osa.mailClient.service;

import com.osa.mailClient.entity.Folder;
import com.osa.mailClient.entity.Rule;
import com.osa.mailClient.repository.RuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RuleService implements RuleServiceInterface {

    @Autowired
    private RuleRepository ruleRepository;

    @Override
    public void Save(Rule rule) {
        ruleRepository.save(rule);
    }

    @Override
    public List<Rule> findByDestination(Folder destination) {
        return ruleRepository.findByDestination(destination);
    }

    @Override
    public void Delete(Rule rule) {
        ruleRepository.delete(rule);
    }

    @Override
    public Rule findOne(long id) {
        return ruleRepository.getOne(id);
    }
}
