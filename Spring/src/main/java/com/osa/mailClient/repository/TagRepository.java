package com.osa.mailClient.repository;

import com.osa.mailClient.entity.Message;
import com.osa.mailClient.entity.Tag;
import com.osa.mailClient.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {

    List<Tag> findByMessages(Message messages);

    List<Tag> findByuserTags(User userTags);

    @Query(value = "delete from tags_messages where tags_id = ?1 and messages_message_id = ?2 ",  nativeQuery = true)
    void deleteMessageTag(long tagId, long messageId);
}
