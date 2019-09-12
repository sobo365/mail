package com.osa.mailClient.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "messages")
public class Message implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_id", unique = true, nullable = false)
    private long id;

    @Column(name = "_from", unique = false, nullable = false)
    private String from;

    @Column(name = "_to", unique = false, nullable = false)
    private String to;

    @Column(name = "cc", unique = false, nullable = true)
    private String cc;

    @Column(name = "bcc", unique = false, nullable = true)
    private String bcc;

    @Column(name = "dateTime", unique = false, nullable = true)
    private Timestamp dateTime;

    @Column(name = "subject", unique = false, nullable = false)
    private String subject;

    @Column(name = "content", unique = false, nullable = false, columnDefinition = "LONGTEXT")
    private String content;

    @Column(name = "_unread", unique = false, nullable = false)
    private boolean unread;

    @Column(name = "_received", unique = false, nullable = true)
    private boolean received;

    @OneToMany(mappedBy = "destination")
    private List<Rule> rules;

    @OneToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER, mappedBy = "message")
    private Set<Attachment> attachments;

    @ManyToOne
    @JoinColumn
    private Folder inFolder;

    @ManyToOne
    @JoinColumn
    private Account accountMessage;

    @ManyToMany(mappedBy = "messages")
    private Set<Tag> tags;

    public Message() {
    }

    public Message(String from, String to, String cc, String bcc, Timestamp dateTime, String subject, String content, boolean unread, boolean received, List<Rule> rules, Set<Attachment> attachments, Folder inFolder, Account accountMessage, Set<Tag> tagsInMessages) {
        this.from = from;
        this.to = to;
        this.cc = cc;
        this.bcc = bcc;
        this.dateTime = dateTime;
        this.subject = subject;
        this.content = content;
        this.unread = unread;
        this.received = received;
        this.rules = rules;
        this.attachments = attachments;
        this.inFolder = inFolder;
        this.accountMessage = accountMessage;
        this.tags = tagsInMessages;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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

    public Timestamp getDateTime() {
        return dateTime;
    }

    public void setDateTime(Timestamp dateTime) {
        this.dateTime = dateTime;
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

    public List<Rule> getRules() {
        return rules;
    }

    public void setRules(List<Rule> rules) {
        this.rules = rules;
    }

    public Set<Attachment> getAttachments() {
        return attachments;
    }

    public void setAttachments(Set<Attachment> attachments) {
        this.attachments = attachments;
    }

    public boolean isReceived() {
        return received;
    }

    public void setReceived(boolean received) {
        this.received = received;
    }

    public Folder getInFolder() {
        return inFolder;
    }

    public void setInFolder(Folder inFolder) {
        this.inFolder = inFolder;
    }

    public Account getAccountMessage() {
        return accountMessage;
    }

    public void setAccountMessage(Account accountMessage) {
        this.accountMessage = accountMessage;
    }

    public Set<Tag> getTagsInMessages() {
        return tags;
    }

    public void setTagsInMessages(Set<Tag> tagsInMessages) {
        this.tags = tagsInMessages;
    }
}
