package com.osa.mailClient.dto;

import com.osa.mailClient.entity.Account;

import java.io.Serializable;

public class AccountDTO implements Serializable {
    private long id;
    private String displayname;
    private String username;
    private String password;
    private String smtpAddress;
    private int smtpPort;

    public AccountDTO(Account account) {
        this.id = account.getId();
        this.displayname = account.getDisplayname();
        this.username = account.getUsername();
        this.password = account.getPassword();
        this.smtpAddress = account.getSmtpAddress();
        this.smtpPort = account.getSmtpPort();
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getDisplayname() {
        return displayname;
    }

    public void setDisplayname(String displayname) {
        this.displayname = displayname;
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
}
