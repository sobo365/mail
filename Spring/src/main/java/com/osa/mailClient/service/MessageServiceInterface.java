package com.osa.mailClient.service;

import com.osa.mailClient.entity.Message;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface MessageServiceInterface {

    List<Message> findAll();
    List<Message> findByAccountId(long userId);
    Message save(Message message);
    Message findById(long id);
    List<Message> findAllByAccountIdFolder(long accountId, long folderId);
    int countMessagesInFolder(long folderId);


}
