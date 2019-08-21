package com.osa.mailClient.service;

import com.osa.mailClient.entity.Account;
import com.osa.mailClient.entity.Folder;
import com.osa.mailClient.repository.FolderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FolderService implements FolderServiceInterface {

    @Autowired
    private FolderRepository folderRepository;

    @Override
    public List<Folder> findAll() {
        return folderRepository.findAll();
    }
}
