package com.osa.mailClient.service;

import com.osa.mailClient.entity.Contact;
import com.osa.mailClient.entity.Photo;

public interface PhotoServiceInterface {
    Photo save(Photo photo);
    Photo getByContact(Contact contactPhoto);
}
