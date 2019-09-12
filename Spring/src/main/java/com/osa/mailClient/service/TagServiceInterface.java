package com.osa.mailClient.service;

import com.osa.mailClient.entity.Message;
import com.osa.mailClient.entity.Tag;

import java.util.List;

public interface TagServiceInterface {

    List<Tag> findAll();
    Tag findOne(long id);
    Tag save(Tag tag);
    List<Tag> findByMessages(Message messagess);
    void deleteMessageTag(long messageId, long tagId);
}
