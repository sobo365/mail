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

    @Column(name = "inServerType", unique = false, nullable = true)
    private short inServerType;

    @Column(name = "inServerAddress", unique = false, nullable = true)
    private String inServerAddress;

    @Column(name = "inServerPort", unique = false, nullable = true)
    private int inServerPort;

    @Column(name = "username", unique = false, nullable = false)
    private String username;

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
    private User user;

    public Account() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getSmtpAddress() {
        return smtpAddress;
    }

    public void setSmtpAddress(String smtpAddress) {
        this.smtpAddress = smtpAddress;
    }

    public int getSmtpPort() {
        return smtpPort;
    }

    public void setSmtpPort(int smtpPort) {
        this.smtpPort = smtpPort;
    }

    public short getInServerType() {
        return inServerType;
    }

    public void setInServerType(short inServerType) {
        this.inServerType = inServerType;
    }

    public String getInServerAddress() {
        return inServerAddress;
    }

    public void setInServerAddress(String inServerAddress) {
        this.inServerAddress = inServerAddress;
    }

    public int getInServerPort() {
        return inServerPort;
    }

    public void setInServerPort(int inServerPort) {
        this.inServerPort = inServerPort;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getDisplayname() {
        return displayname;
    }

    public void setDisplayname(String displayname) {
        this.displayname = displayname;
    }

    public List<Folder> getAccountFolders() {
        return accountFolders;
    }

    public void setAccountFolders(List<Folder> accountFolders) {
        this.accountFolders = accountFolders;
    }

    public List<Message> getAccountMessages() {
        return accountMessages;
    }

    public void setAccountMessages(List<Message> accountMessages) {
        this.accountMessages = accountMessages;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
