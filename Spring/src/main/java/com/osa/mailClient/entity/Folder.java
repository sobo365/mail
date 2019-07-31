package com.osa.mailClient.entity;

import org.hibernate.annotations.ManyToAny;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
import java.util.Set;

import static javax.persistence.CascadeType.ALL;

@Entity
@Table(name = "folders")
public class Folder implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "folder_id", unique = true, nullable = false)
    private long id;

    @Column(name = "name", unique = false, nullable = true)
    private String name;


    @OneToMany(mappedBy = "inFolder", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Message> messages;

    @OneToMany(mappedBy = "parentFolder")
    private List<Folder> childFolders;

    @ManyToOne
    @JoinColumn
    private Folder parentFolder;

    @ManyToOne
    @JoinColumn
    private Account accountFolder;





}
