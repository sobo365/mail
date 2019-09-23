package com.osa.mailClient.service;

import com.osa.mailClient.entity.Message;
import com.osa.mailClient.entity.Tag;
import com.osa.mailClient.entity.User;

import java.util.List;

public interface TagServiceInterface {

    List<Tag> findAll();
    Tag findOne(long id);
    Tag save(Tag tag);
    List<Tag> findByMessages(Message messagess);
    List<Tag> findByuserTags(User userTags);
    void deleteMessageTag(long messageId, long tagId);
    void Delete(Tag tag);
}
