package com.osa.mailClient.repository;

import com.osa.mailClient.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {


    @Query(value = "SELECT * FROM messages m WHERE m.account_message_account_id = ?1 ORDER BY m.date_time desc ",  nativeQuery = true)
    List<Message> findAllByAccountId(long accountId);

    @Query(value = "SELECT * FROM messages m WHERE m.account_message_account_id = ?1 and in_folder_folder_id = ?2 ORDER BY m.date_time desc ",  nativeQuery = true)
    List<Message> findAllByAccountIdFolder(long accountId, long folderId);


    @Query(value = "SELECT count(*)  from messages m where m.in_folder_folder_id = ?1 ",  nativeQuery = true)
    int countMessagesInFolder(long folderId);

    @Query(value = "select * from messages where account_message_account_id = ?1 and (  _to = ?2 or _from = ?2) ",  nativeQuery = true)
    List<Message> findForContact(long accountId, String address);


}
