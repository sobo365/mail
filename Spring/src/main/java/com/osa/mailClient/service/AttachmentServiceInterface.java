package com.osa.mailClient.service;

import com.osa.mailClient.entity.Attachment;
import com.osa.mailClient.entity.Message;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AttachmentServiceInterface {
    List<Attachment> findAll();
    List<Attachment> findByMessage(Message messages);
}
