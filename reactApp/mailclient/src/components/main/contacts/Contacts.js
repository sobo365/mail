import React, { Component } from 'react';
import Sidebar from '../sidebar/Sidebar';
import Compose from '../../dialogs/Compose';
import axios from 'axios';
import ContactList from './ContactsList'
import ContactDisplay from './ContactDisplay'
import contacts from 'material-ui/svg-icons/communication/contacts';

export class Contacts extends Component {
    constructor(props){
        super(props);

        this.state = {
            username: '',
            contacts: [],
            contactMessages : [],
            contact: {
                
            }
        }
    }

    componentDidMount() {
        if(localStorage.getItem('token') == null){
            this.props.history.push('/login');
        }
        this.state.username = localStorage.getItem('username');

        var token = localStorage.getItem('token');
        
        axios({
          method: 'get',
          url: 'http://localhost:8080/contact/getContacts',
          params: {
              id: localStorage.getItem('user_id')
          },
          headers: {
            Authorization: 'Bearer ' + token
          }
        }).then((response) => {
            this.setState({
                contacts: response.data
            })
           console.log(response.data)
          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {
            // always executed
          }); 
     }

     getContact = (contactVal, messages) => {
         
        this.setState({
            contact: contactVal
        })
        this.setState({
            contactMessages: messages
        })
        this.forceUpdate();
    }


    retContact = (contact) => {
        
        this.state.contacts.push(contact);
        
        this.forceUpdate();
    }

    deleteContact = (contactId, position) =>{
        var token = localStorage.getItem('token');
        axios({
            method: 'DELETE',
            url: 'http://localhost:8080/contact/deleteContact',
            headers: {
                Authorization: 'Bearer ' + token
            },
            params: {
                contactId: contactId
            }
        }).then((response) => {
            this.state.contacts.splice(position, 1);
            this.forceUpdate();
        })

        
    }
     

    render() {
        return (
            <div>
                <Sidebar contacts></Sidebar> 
                <Compose></Compose>

                <ContactList retContact = {this.retContact.bind(this)} getContact={this.getContact.bind(this)} update={this.componentDidMount} style = {this.list} contacts={this.state.contacts}></ContactList>      

                <ContactDisplay deleteContact = {this.deleteContact.bind(this)} messages={this.state.contactMessages} contact = {this.state.contact}></ContactDisplay>      
                
                
            </div>
        )
    }


    
}

export default Contacts
