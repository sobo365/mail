package com.osa.mailClient.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "accounts")
public class Account implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "account_id", unique = true, nullable = false)
    private long id;

    @Column(name = "smtpaddress", unique = false, nullable = false)
    private String smtpAddress;

    @Column(name = "smtpPort", unique = false, nullable = false)
    private int smtpPort;

    @Column(name = "inServerType", unique = false, nullable = false)
    private short inServerType;

    @Column(name = "inServerAddress", unique = false, nullable = false)
    private String inServerAddress;

    @Column(name = "inServerPort", unique = false, nullable = false)
    private int inServerPort;

    @Column(name = "username", unique = true, nullable = false)
    private char username;

    @Column(name = "password", unique = false, nullable = false)
    private String password;

    @Column(name = "displayname", unique = false, nullable = false)
    private String displayname;

    @OneToMany(mappedBy = "accountFolder")
    private List<Folder> accountFolders;

    @OneToMany(mappedBy = "accountMessage")
    private List<Message> accountMessages;

    @ManyToOne
    @JoinColumn
    private User userAccount;


}
