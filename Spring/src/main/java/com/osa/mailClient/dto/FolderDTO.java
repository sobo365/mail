package com.osa.mailClient.dto;

import javax.mail.Folder;
import java.io.Serializable;

public class FolderDTO implements Serializable {

    private String name;

    public FolderDTO(Folder folder) {
        this.name = folder.getName();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
