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
}
