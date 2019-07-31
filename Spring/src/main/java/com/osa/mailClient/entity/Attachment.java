package com.osa.mailClient.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Base64;

@Entity
@Table(name = "attachments")
public class Attachment implements Serializable {

    @Id
    @GeneratedValue
    @Column(name = "attachment_id", unique = true, nullable = false)
    private long id;

    @Column(name = "data", unique = false, nullable = false)
    private String data;

    @Column(name = "mime_type", unique = false, nullable = false)
    private String mimeType;

    @Column(name = "name", unique = false, nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn
    private Message messageAttachment;
}
