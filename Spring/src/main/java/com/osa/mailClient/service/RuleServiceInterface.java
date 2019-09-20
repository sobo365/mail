package com.osa.mailClient.service;

import com.osa.mailClient.entity.Folder;
import com.osa.mailClient.entity.Rule;

import java.util.List;

public interface RuleServiceInterface {

    void Save(Rule rule);
    List<Rule> findByDestination(Folder destination);
    void Delete(Rule rule);
    Rule findOne(long id);
}
