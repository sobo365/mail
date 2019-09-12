insert into users(username, password, firstname, lastname, last_password_reset_date) values('a', '$2a$10$uFuAIiUfK8hWQyGp.kquvu50bfUy8U7bqbEc.vi8aOh/i5YmvVoGS', 'a', 'a', '2017-10-01 21:58:58.508');

insert into accounts(account_id, displayname, in_server_address, in_server_port, in_server_type, password, smtpaddress, smtp_port, username, user_user_id) values (1, 'Bonko', 'pop.gmail.com', 0, 0, 'TestPMSU1','pop.gmail.com', 8080, 'testpmsu@gmail.com', 1)

insert into messages(message_id, bcc, cc, content, date_time, _from, subject, _to, _unread, account_message_account_id, in_folder_folder_id, _received) values(1, null, null, 'content', '2019-08-08 12:00:00', 'from', 'subject' ,'to', true, 1,1, true)
insert into messages(message_id, bcc, cc, content, date_time, _from, subject, _to, _unread, account_message_account_id, in_folder_folder_id, _received) values(2, null, null, 'content2', '2019-08-11 2:00:00', 'from2', 'subject2' ,'to2', true, 1,1, true)
insert into messages(message_id, bcc, cc, content, date_time, _from, subject, _to, _unread, account_message_account_id, in_folder_folder_id, _received) values(3, null, null, 'content2', '2019-08-10 2:00:00', 'from2', 'subject2' ,'to2', true, 2,3, true)

insert into folders(folder_id, name, account_folder_account_id, parent_folder_folder_id) values(1, 'inbox', 1, null)
insert into folders(folder_id, name, account_folder_account_id, parent_folder_folder_id) values(2, 'outbox', 1, null)
insert into folders(folder_id, name, account_folder_account_id, parent_folder_folder_id) values(3, 'spam', 1, null)
insert into folders(folder_id, name, account_folder_account_id, parent_folder_folder_id) values(4, 'drafts', 1, null)

insert into contacts(contact_id, displayname, email, firstname, lastname, note, user_contact_user_id) values(1, 'pera', 'pera@gmail.com', 'pera', 'peric' , 'note', 1) ;

insert into tags(id, name, user_tags_user_id) values (1, 'Important', 1)
insert into tags(id, name, user_tags_user_id) values (2, 'Spam', 1)