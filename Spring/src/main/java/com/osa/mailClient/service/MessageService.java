package com.osa.mailClient.service;

import com.osa.mailClient.entity.Message;
import com.osa.mailClient.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MessageService implements MessageServiceInterface {

    @Autowired
    private MessageRepository messageRepository;

    @Override
    public List<Message> findAll() {
        return messageRepository.findAll();
    }

    @Override
    public Message findById(long id) {
        return messageRepository.getOne(id);
    }

    @Override
    public Message save(Message message) {
        return messageRepository.save(message);
    }

    @Override
    public List<Message> findByAccountId(long accountId) {
        return messageRepository.findAllByAccountId(accountId);
    }
}
