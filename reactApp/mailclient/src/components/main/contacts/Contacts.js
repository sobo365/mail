import React, { Component } from 'react';
import Sidebar from '../sidebar/Sidebar';
import Compose from '../../dialogs/Compose';
import axios from 'axios';
import ContactList from './ContactsList'
import ContactDisplay from './ContactDisplay'

export class Contacts extends Component {
    constructor(props){
        super(props);

        this.state = {
            username: '',
            contacts: [],
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

     getContact = (contactVal) => {
        this.setState({
            contact: contactVal
        })

        
    }

     
     

    render() {
        return (
            <div>
                <Sidebar contacts></Sidebar> 
                <Compose></Compose>

                <ContactList getContact={this.getContact.bind(this)} update={this.componentDidMount} style = {this.list} contacts={this.state.contacts}></ContactList>      

                <ContactDisplay contact = {this.state.contact}></ContactDisplay>      
                
                
            </div>
        )
    }


    
}

export default Contacts
