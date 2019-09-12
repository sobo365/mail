package com.osa.mailClient.dto;

import com.osa.mailClient.entity.Attachment;

import java.io.Serializable;

public class AttachmentDTO implements Serializable {
    private long id;
    private String name;
    private String data;
    private String mimeType;

    public AttachmentDTO(Attachment attachment){
        this.id = attachment.getId();
        this.name = attachment.getName();
        this.data = attachment.getData();
        this.mimeType = attachment.getMimeType();
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
}
