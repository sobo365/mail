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

    public Folder() {
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

    public List<Message> getMessages() {
        return messages;
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }

    public List<Folder> getChildFolders() {
        return childFolders;
    }

    public void setChildFolders(List<Folder> childFolders) {
        this.childFolders = childFolders;
    }

    public Folder getParentFolder() {
        return parentFolder;
    }

    public void setParentFolder(Folder parentFolder) {
        this.parentFolder = parentFolder;
    }

    public Account getAccountFolder() {
        return accountFolder;
    }

    public void setAccountFolder(Account accountFolder) {
        this.accountFolder = accountFolder;
    }
}
