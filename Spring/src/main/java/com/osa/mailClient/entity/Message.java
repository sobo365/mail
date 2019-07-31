package com.osa.mailClient.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "messages")
public class Message implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_id", unique = true, nullable = false)
    private long id;

    @Column(name = "_from", unique = false, nullable = false)
    private String from;

    @Column(name = "_to", unique = false, nullable = false)
    private String to;

    @Column(name = "cc", unique = false, nullable = false)
    private String cc;

    @Column(name = "bcc", unique = false, nullable = false)
    private String bcc;

    @Column(name = "dateTime", unique = false, nullable = false)
    private Timestamp dateTime;

    @Column(name = "subject", unique = false, nullable = false)
    private String subject;

    @Column(name = "content", unique = false, nullable = false)
    private String content;

    @Column(name = "_unread", unique = false, nullable = false)
    private boolean unread;

    @OneToMany(mappedBy = "destination")
    private List<Rule> rules;

    @OneToMany(mappedBy = "messageAttachment")
    private List<Attachment> messageAttachments;

    @ManyToOne
    @JoinColumn
    private Folder inFolder;

    @ManyToOne
    @JoinColumn
    private Account accountMessage;

    @ManyToMany(mappedBy = "messagesTags")
    private Set<Tag> tagsInMessages;
}
