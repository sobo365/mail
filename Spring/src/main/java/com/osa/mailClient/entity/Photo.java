package com.osa.mailClient.entity;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "photos")
public class Photo implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rule_id", unique = true, nullable = false)
    private long id;

    @Column(name = "path", unique = false, nullable = false)
    private String path;

    @ManyToOne
    @JoinColumn
    private Contact contactPhoto;
}
