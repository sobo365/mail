package com.osa.mailClient.dto;

import com.osa.mailClient.entity.Contact;

import java.io.Serializable;

public class ContactDTO implements Serializable {
    private long id;
    private String displayname;
    private String firstname;
    private String lastname;
    private String email;
    private String note;
    private PhotoDTO photo;

    public ContactDTO(Contact contact, PhotoDTO photo){
        this.id = contact.getId();
        this.displayname = contact.getDisplayname();
        this.firstname = contact.getFirstname();
        this.lastname = contact.getLastname();
        this.email = contact.getEmail();
        this.note = contact.getNote();
        this.photo = photo;
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

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public PhotoDTO getPhoto() {
        return photo;
    }

    public void setPhoto(PhotoDTO photo) {
        this.photo = photo;
    }
}
