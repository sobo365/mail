package com.osa.mailClient.dto;

import com.osa.mailClient.entity.Rule;
import com.osa.mailClient.enums.Condition;
import com.osa.mailClient.enums.Operation;

import java.io.Serializable;

public class RuleDTO implements Serializable {

    private long id;
    private String operation;
    private String condition;
    private String value;

    public RuleDTO(Rule rule) {
        this.id = rule.getId();
        this.operation = Operation.valueOf(rule.getOperation()).toString();
        this.condition = Condition.valueOf(rule.getCondition()).toString();
        this.value = rule.getValue();
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getOperation() {
        return operation;
    }

    public void setOperation(String operation) {
        this.operation = operation;
    }

    public String getCondition() {
        return condition;
    }

    public void setCondition(String condition) {
        this.condition = condition;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
