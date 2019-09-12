package com.osa.mailClient.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Base64;

@Entity
@Table(name = "attachments")
public class Attachment implements Serializable {

    @Id
    @GeneratedValue
    @Column(name = "attachment_id", unique = true, nullable = false)
    private long id;

    @Column(name = "data", unique = false, nullable = false, columnDefinition = "LONGTEXT")
    private String data;

    @Column(name = "mime_type", unique = false, nullable = false)
    private String mimeType;

    @Column(name = "name", unique = false, nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "message", referencedColumnName = "message_id")
    private Message message;

    public Attachment(String data, String mimeType, String name, Message messageAttachment) {
        this.data = data;
        this.mimeType = mimeType;
        this.name = name;
        this.message = messageAttachment;
    }

    public Attachment() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getMimeType() {
        return mimeType;
    }

    public void setMimeType(String mimeType) {
        this.mimeType = mimeType;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Message getMessageAttachment() {
        return message;
    }

    public void setMessageAttachment(Message messageAttachment) {
        this.message = messageAttachment;
    }
}
