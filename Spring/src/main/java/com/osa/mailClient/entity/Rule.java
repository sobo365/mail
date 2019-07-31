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

}
