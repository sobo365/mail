package com.osa.mailClient.entity;

import org.springframework.boot.autoconfigure.condition.ConditionalOnJava;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "rules")
public class Rule implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rule_id", unique = true, nullable = false)
    private long id;

    @Column(name = "_condition", unique = false, nullable = true)
    private short condition;

    @Column(name = "value", unique = false, nullable = false)
    private String value;

    @Column(name = "operation", unique = false, nullable = false)
    private short operation;

    @ManyToOne
    @JoinColumn
    private Folder destination;

    public Rule() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public short getCondition() {
        return condition;
    }

    public void setCondition(short condition) {
        this.condition = condition;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public short getOperation() {
        return operation;
    }

    public void setOperation(short operation) {
        this.operation = operation;
    }

    public Folder getDestination() {
        return destination;
    }

    public void setDestination(Folder destination) {
        this.destination = destination;
    }
}
