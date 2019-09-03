package com.osa.mailClient.service;

import com.osa.mailClient.entity.Account;
import com.osa.mailClient.entity.Folder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface FolderServiceInterface {
    List<Folder> findAll();
    List<Folder> findAllByAccountFolder(Account account);
    Folder findById(long id);
    Folder save(Folder folder);
    Folder findDefaultFolderByName(String name, long accountId);
}
