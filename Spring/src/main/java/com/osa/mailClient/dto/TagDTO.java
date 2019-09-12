package com.osa.mailClient.dto;

import com.osa.mailClient.entity.Tag;

import java.io.Serializable;

public class TagDTO implements Serializable {
    private long id;
    private String name;

    public TagDTO(Tag tag){
        this.id = tag.getId();
        this.name = tag.getName();

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
}
