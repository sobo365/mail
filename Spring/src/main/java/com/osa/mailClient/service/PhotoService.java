package com.osa.mailClient.service;

import com.osa.mailClient.entity.Photo;
import com.osa.mailClient.repository.PhotoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PhotoService implements PhotoServiceInterface {

    @Autowired
    private PhotoRepository photoRepository;

    @Override
    public Photo save(Photo photo) {
        return photoRepository.save(photo);
    }
}
