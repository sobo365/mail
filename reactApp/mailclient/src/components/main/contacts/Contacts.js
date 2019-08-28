import React, { Component } from 'react';
import Sidebar from '../sidebar/Sidebar';
import AddContact from '../../dialogs/ContactDialog';
import Compose from '../../dialogs/Compose';
import axios from 'axios';
import ContactList from './ContactsList'
import ContactDisplay from './ContactDisplay'

export class Contacts extends Component {
    constructor(props){
        super(props);

        this.state = {
            username: '',
            contacts: []
        }
    }

    componentDidMount() {
        if(localStorage.getItem('token') == null){
            this.props.history.push('/login');
        }
        this.state.username = localStorage.getItem('username');
     }

     componentDidMount = () =>{
        var token = localStorage.getItem('token');
        
        axios({
          method: 'get',
          url: 'http://localhost:8080/contact/getContacts',
          params: {
              id: 1
          },
          headers: {
            Authorization: 'Bearer ' + token
          }
        }).then((response) => {
            this.setState({
                contacts: response.data
            })
           
          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {
            // always executed
          }); 

     }
     

    render() {
        return (
            <div>
                <Sidebar contacts></Sidebar> 
                <AddContact></AddContact>
                <Compose></Compose>
                <ContactList style = {this.list} contacts={this.state.contacts}></ContactList>      
                <ContactDisplay></ContactDisplay>      

                
                
            </div>
        )
    }

    
}

export default Contacts
