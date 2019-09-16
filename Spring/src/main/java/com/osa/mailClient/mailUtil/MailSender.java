package com.osa.mailClient.mailUtil;

import com.osa.mailClient.entity.Account;
import com.osa.mailClient.entity.Attachment;
import com.osa.mailClient.entity.Message;
import com.osa.mailClient.helper.AttachmentsWrapper;
import org.springframework.stereotype.Component;

import javax.mail.*;
import javax.mail.internet.*;
import java.util.List;
import java.util.Properties;

@Component
public class MailSender {

    public static boolean sendMail(Message message, Account account, AttachmentsWrapper attachments) {

        Properties props = new Properties();

        props.put("mail.smtp.host", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");
        props.put("mail.smtp.auth", "true");

        Session session = Session.getInstance(props, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(account.getUsername(), account.getPassword());
            }
        });

        try {
            javax.mail.Message mimeMessage = new MimeMessage(session);
            mimeMessage.setFrom(new InternetAddress(message.getFrom()));

            String to = message.getTo();
            String bcc = message.getBcc();
            String cc = message.getCc();
            InternetAddress[] addresses = InternetAddress.parse(to, true);
            InternetAddress[] addressesBcc = InternetAddress.parse(bcc, true);
            InternetAddress[] addressesCc = InternetAddress.parse(cc, true);

            mimeMessage.setRecipients(javax.mail.Message.RecipientType.TO, addresses);
            mimeMessage.setRecipients(javax.mail.Message.RecipientType.BCC, addressesBcc);
            mimeMessage.setRecipients(javax.mail.Message.RecipientType.CC, addressesCc);
            mimeMessage.setSentDate(message.getDateTime());
            mimeMessage.setSubject(message.getSubject());

            Multipart multipart = new MimeMultipart();

            for(Attachment att : attachments.getAttachments()){
                MimeBodyPart filePart = new PreencodedMimeBodyPart("base64");
                filePart.setContent(att.getData(), att.getMimeType());
                filePart.setFileName(att.getName());
                multipart.addBodyPart(filePart);
            }

            //Text content
            MimeBodyPart mbPart = new MimeBodyPart();
            mbPart.setText(message.getContent());
            multipart.addBodyPart(mbPart);

            mimeMessage.setContent(multipart);


            Transport.send(mimeMessage);

            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }



    }


}
