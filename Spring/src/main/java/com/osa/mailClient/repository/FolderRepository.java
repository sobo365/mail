package com.osa.mailClient.repository;

import com.osa.mailClient.entity.Account;
import com.osa.mailClient.entity.Folder;
import com.osa.mailClient.entity.Message;
import com.osa.mailClient.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FolderRepository extends JpaRepository<Folder, Long> {
    List<Folder> findAllByAccountFolder(Account account);

    @Query(value = "SELECT * FROM folders f WHERE f.name = ?1 and account_folder_account_id = ?2 ",  nativeQuery = true)
    Folder findDefaultFolderByName(String name, long id);
}
