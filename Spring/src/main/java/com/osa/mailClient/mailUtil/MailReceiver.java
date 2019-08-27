package com.osa.mailClient.mailUtil;

import com.osa.mailClient.entity.Account;
import com.osa.mailClient.service.AccountService;
import com.osa.mailClient.service.FolderService;
import com.osa.mailClient.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.Date;
import java.util.Properties;
import javax.mail.*;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMultipart;


@Component
public class MailReceiver {

    @Autowired
    private MessageService messageService;

    @Autowired
    private static AccountService accountService;

    @Autowired
    private FolderService folderService;


    public void checkMail(String inServerAddress, String inServerPort, String username,String password, Account account)
    {

        try {
            //Set property values
            Properties propvals = new Properties();
            propvals.put("mail.pop3.host", inServerAddress);
            propvals.put("mail.pop3.port", inServerPort);
            propvals.put("mail.pop3.starttls.enable", "true");
            Session emailSessionObj = Session.getDefaultInstance(propvals);
            //Create POP3 store object and connect with the server
            Store storeObj = emailSessionObj.getStore("pop3s");
            storeObj.connect(inServerAddress, username, password);
            //Create folder object and open it in read-only mode
            Folder emailFolderObj = storeObj.getFolder("INBOX");
            emailFolderObj.open(Folder.READ_ONLY);
            //Fetch messages from the folder and print in a loop
            Message[] messageobjs = emailFolderObj.getMessages();

            for (int i = 0, n = messageobjs.length; i < n; i++) {
                Message message = messageobjs[i];
                Address[] fromAddress = message.getFrom();
                String address = fromAddress[0].toString();
                String subject = message.getSubject();
                String from = new String();
                Date dateTime = message.getSentDate();

                String contetType = message.getContentType();
                String messageContent = "";

                if(contetType.contains("multipart")){
                    Multipart multiPart = (Multipart) message.getContent();
                    int numberOfParts = multiPart.getCount();
                    for (int partCount = 0; partCount < numberOfParts; partCount++) {
                        MimeBodyPart part = (MimeBodyPart) multiPart.getBodyPart(partCount);
                        if (Part.ATTACHMENT.equalsIgnoreCase(part.getDisposition())) {
                            // this part is attachment
                            String fileName = part.getFileName();
                            messageContent = fileName;

//                            attachFiles += fileName + ", ";
//                            part.saveFile("./data" + File.separator + fileName);
//                            byte[] bFile = Files.readAllBytes(new File("./data/"+ fileName).toPath());
//                            String sFile = Base64.encodeBase64String(bFile);
//                            Attachment att = new Attachment();
//                            att.setId(att.hashCode());
//                            att.setName(fileName);
//                            att.setData(sFile);
//                            att.setType(".jpg");
//                            modelMessage.getAttachments().add(att);
//
//                            File fl = new File("./data/"+ fileName);
//                            fl.delete();


                        } else {
                            if(part.isMimeType("text/plain")){
                                messageContent = part.getContent().toString();
                            }else if(part.isMimeType("text/hml")){
                                messageContent = part.getContent().toString();
                            }


                        }
                    }
                    //modelMessage.setContent(messageContent.split(">")[1].split("<")[0]);
                    //System.out.println(getTextFromMessage(message));
//                    modelMessage.setContent(getTextFromMessage(message));
//                    if (attachFiles.length() > 1) {
//                        attachFiles = attachFiles.substring(0, attachFiles.length() - 2);
//                    }

                }else{

                    messageContent = getTextFromMessage(message);
                }

                if((fromAddress = message.getFrom()) != null) {
                    StringBuilder sb = new StringBuilder();
                    for(int j = 0; j < fromAddress.length; j++) {
                        sb.append(fromAddress[j].toString());
                    }

                    from  = sb.toString().split("<")[1].split(">")[0];
                }

                com.osa.mailClient.entity.Message entityMessage = new com.osa.mailClient.entity.Message();

                entityMessage.setContent(messageContent);
                entityMessage.setFrom(from);
                entityMessage.setSubject(subject);
                entityMessage.setDateTime(new Timestamp(dateTime.getTime()));
                entityMessage.setAccountMessage(account);
                entityMessage.setUnread(true);
                entityMessage.setTo(account.getUsername());
                entityMessage.setReceived(false);

                com.osa.mailClient.entity.Folder folder = folderService.findDefaultFolderByName("Inbox", account.getId());
                entityMessage.setInFolder(folder);

                messageService.save(entityMessage);


                System.out.println(".............");
                System.out.println(entityMessage.getSubject());
                System.out.println(entityMessage.getFrom());
                System.out.println(entityMessage.getContent());
                System.out.println(entityMessage.getDateTime());

            }
            //Now close all the objects
            emailFolderObj.close(false);
            storeObj.close();
        } catch (NoSuchProviderException exp) {
            exp.printStackTrace();
        } catch (MessagingException exp) {
            exp.printStackTrace();
        } catch (Exception exp) {
            exp.printStackTrace();
        }
    }

    private static String getTextFromMessage(Message message) throws MessagingException, IOException {
        String result = "";
        if (message.isMimeType("text/plain")) {
            result = message.getContent().toString();
        } else if (message.isMimeType("multipart/*")) {
            MimeMultipart mimeMultipart = (MimeMultipart) message.getContent();
            result = getTextFromMimeMultipart(mimeMultipart);
        }
        return result;
    }

    private static String getTextFromMimeMultipart(
            MimeMultipart mimeMultipart)  throws MessagingException, IOException {
        String result = "";
        int count = mimeMultipart.getCount();
        for (int i = 0; i < count; i++) {
            BodyPart bodyPart = mimeMultipart.getBodyPart(i);
            if (bodyPart.isMimeType("text/plain")) {
                result = result + "\n" + bodyPart.getContent();
                break; // without break same text appears twice in my tests
            } else if (bodyPart.getContent() instanceof MimeMultipart){
                result = result + getTextFromMimeMultipart((MimeMultipart)bodyPart.getContent());
            }
        }
        return result;
    }


}
