package com.osa.mailClient.dto;

import com.osa.mailClient.entity.Folder;

import java.io.Serializable;

public class FolderDTO implements Serializable {

    private long id;

    private String name;

    private int messageCount;

    public FolderDTO(Folder folder) {
        this.name = folder.getName();
        this.id = folder.getId();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getMessageCount() {
        return messageCount;
    }

    public void setMessageCount(int messageCount) {
        this.messageCount = messageCount;
    }
}
