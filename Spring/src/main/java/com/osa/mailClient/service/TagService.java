package com.osa.mailClient.service;

import com.osa.mailClient.entity.Message;
import com.osa.mailClient.entity.Tag;
import com.osa.mailClient.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

@Service
public class TagService implements TagServiceInterface {

    @Autowired
    private TagRepository tagRepository;

    @PersistenceContext
    protected EntityManager entityManager;

    @Override
    public List<Tag> findAll() {
        return tagRepository.findAll();
    }

    @Override
    public Tag findOne(long id) {
        return tagRepository.getOne(id);
    }

    @Override
    public Tag save(Tag tag) {
        return tagRepository.save(tag);
    }

    @Override
    public List<Tag> findByMessages(Message messagess) {
        return tagRepository.findByMessages(messagess);
    }

    @Override
    public void Delete(Tag tag) {
        tagRepository.delete(tag);
    }

    @Override
    @Transactional
    @Modifying
    public void deleteMessageTag(long messageId, long tagId) {
        Query query = entityManager.createNativeQuery("DELETE FROM tags_messages  WHERE tags_id = ?1 and messages_message_id = ?2");
        query.setParameter(1, tagId);
        query.setParameter(2, messageId);
        query.executeUpdate();
        entityManager.flush();
    }
}
