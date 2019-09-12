package com.osa.mailClient.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name = "tags")
public class Tag implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private long id;

    @Column(name = "name", unique = false, nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn
    private User userTags;

    @ManyToMany
    @JoinColumn
    private Set<Message> messages;


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

    public User getUserTags() {
        return userTags;
    }

    public void setUserTags(User userTags) {
        this.userTags = userTags;
    }

    public Set<Message> getMessagesTags() {
        return messages;
    }

    public void setMessagesTags(Set<Message> messagesTags) {
        this.messages = messagesTags;
    }
}
