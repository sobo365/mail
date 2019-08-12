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
}
