package com.osa.mailClient.dto;

import com.osa.mailClient.entity.Attachment;
import com.osa.mailClient.entity.Message;
import com.osa.mailClient.service.AttachmentService;
import com.osa.mailClient.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class MessageDTO implements Serializable {



    private long id;
    private String from;
    private String to;
    private String cc;
    private String bcc;
    private String subject;
    private String content;
    private boolean unread;
    private Timestamp dateTime;




    public MessageDTO(Message message) {
        this.from = message.getFrom();
        this.to = message.getTo();
        this.bcc = message.getBcc();
        this.cc = message.getCc();
        this.subject = message.getSubject();
        this.content = message.getContent();
        this.unread = message.isUnread();
        this.dateTime = message.getDateTime();
        this.id = message.getId();



    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public String getCc() {
        return cc;
    }

    public void setCc(String cc) {
        this.cc = cc;
    }

    public String getBcc() {
        return bcc;
    }

    public void setBcc(String bcc) {
        this.bcc = bcc;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public boolean isUnread() {
        return unread;
    }

    public void setUnread(boolean unread) {
        this.unread = unread;
    }

    public Timestamp getDateTime() {
        return dateTime;
    }

    public void setDateTime(Timestamp dateTime) {
        this.dateTime = dateTime;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }


}
