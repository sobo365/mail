package com.osa.mailClient.service;

import com.osa.mailClient.entity.Account;
import com.osa.mailClient.entity.Folder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface FolderServiceInterface {
    List<Folder> findAll();
}
