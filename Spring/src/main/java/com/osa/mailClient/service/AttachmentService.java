package com.osa.mailClient.service;

import com.osa.mailClient.entity.Attachment;
import com.osa.mailClient.entity.Message;
import com.osa.mailClient.repository.AttachmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AttachmentService implements AttachmentServiceInterface {

    @Autowired
    private AttachmentRepository attachmentRepository;

    @Override
    public List<Attachment> findAll() {
        return attachmentRepository.findAll();
    }

    @Override
    public List<Attachment> findByMessage(Message message) {
        return attachmentRepository.findByMessage(message);
    }

    @Override
    public void Save(Attachment attachment) {
        attachmentRepository.save(attachment);
    }
}
