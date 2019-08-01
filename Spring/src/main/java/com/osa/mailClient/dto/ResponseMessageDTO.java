package com.osa.mailClient.dto;

public class ResponseMessageDTO {
    private String value;

    public ResponseMessageDTO() {
    }

    public ResponseMessageDTO(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
