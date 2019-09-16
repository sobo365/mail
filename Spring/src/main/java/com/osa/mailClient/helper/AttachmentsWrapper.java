package com.osa.mailClient.helper;

import com.osa.mailClient.entity.Attachment;

import java.util.List;

public class AttachmentsWrapper {

    private List<Attachment> attachments;

    public AttachmentsWrapper() {
    }

    public List<Attachment> getAttachments() {
        return attachments;
    }

    public void setAttachments(List<Attachment> attachments) {
        this.attachments = attachments;
    }
}
