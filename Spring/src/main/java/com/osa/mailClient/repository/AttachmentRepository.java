package com.osa.mailClient.repository;

import com.osa.mailClient.entity.Attachment;
import com.osa.mailClient.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AttachmentRepository extends JpaRepository<Attachment, Long> {
    List<Attachment> findByMessage(Message message);
}
