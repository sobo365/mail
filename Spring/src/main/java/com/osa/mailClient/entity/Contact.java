package com.osa.mailClient.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "contacts")
public class Contact implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "contact_id", unique = true, nullable = false)
    private long id;

    @Column(name = "firstname", unique = false, nullable = false)
    private String firstname;

    @Column(name = "lastname", unique = false, nullable = false)
    private String lastname;

    @Column(name = "displayname", unique = false, nullable = false)
    private String displayname;

    @Column(name = "email", unique = false, nullable = false)
    private String email;

    @Column(name = "note", unique = false, nullable = true)
    private String note;

    @ManyToOne
    @JoinColumn
    private User userContact;

    @OneToMany(mappedBy = "contactPhoto")
    private List<Photo> contactPhotos;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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

    public String getDisplayname() {
        return displayname;
    }

    public void setDisplayname(String displayname) {
        this.displayname = displayname;
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

    public User getUserContact() {
        return userContact;
    }

    public void setUserContact(User userContact) {
        this.userContact = userContact;
    }

    public List<Photo> getContactPhotos() {
        return contactPhotos;
    }

    public void setContactPhotos(List<Photo> contactPhotos) {
        this.contactPhotos = contactPhotos;
    }
}
