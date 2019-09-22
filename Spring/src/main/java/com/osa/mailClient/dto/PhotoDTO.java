package com.osa.mailClient.dto;

import com.osa.mailClient.entity.Photo;

import java.io.Serializable;

public class PhotoDTO implements Serializable {
    private long id;
    private String data;

    public PhotoDTO(Photo photo){
        this.id = photo.getId();
        this.data = photo.getPath();
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
}
