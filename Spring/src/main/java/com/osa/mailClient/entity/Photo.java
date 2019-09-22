package com.osa.mailClient.entity;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "photos")
public class Photo implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "photo_id", unique = true, nullable = false)
    private long id;

    @Column(name = "path", unique = false, nullable = false,  columnDefinition = "LONGTEXT")
    private String path;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn
    private Contact contactPhoto;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public Contact getContactPhoto() {
        return contactPhoto;
    }

    public void setContactPhoto(Contact contactPhoto) {
        this.contactPhoto = contactPhoto;
    }
}
