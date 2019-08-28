package com.osa.mailClient.dto;

import com.osa.mailClient.entity.Contact;

import java.io.Serializable;

public class ContactDTO implements Serializable {
    private String displayname;
    private String firstname;
    private String lastname;
    private String email;
    private String note;

    public ContactDTO(Contact contact){
        this.displayname = contact.getDisplayname();
        this.firstname = contact.getFirstname();
        this.lastname = contact.getLastname();
        this.email = contact.getEmail();
        this.note = contact.getNote();
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
}
