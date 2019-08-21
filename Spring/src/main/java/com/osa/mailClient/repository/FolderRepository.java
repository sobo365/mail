package com.osa.mailClient.repository;

import com.osa.mailClient.entity.Account;
import com.osa.mailClient.entity.Folder;
import com.osa.mailClient.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FolderRepository extends JpaRepository<Folder, Long> {

}
