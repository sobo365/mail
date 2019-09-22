import React, { Component } from 'react';
import List from '@material-ui/core/List';
import Contact from './Contact'
import AddContact from './ContactDialog'

export class ContactsList extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            components : []
        }
    }

    renderList =  () => {
        this.state.components = []

        for(let i = 0; i < this.props.contacts.length; i++){
            let contact = this.props.contacts[i];
            this.state.components.push(<Contact
                                        key = {i}
                                        position = {i}
                                        id = {contact.id}
                                        firstname = {contact.firstname}
                                        lastname = {contact.lastname}
                                        email = {contact.email}
                                        displayname = {contact.displayname}
                                        note = {contact.note}
                                        photo = {contact.photo.data}
                                        getContact={this.props.getContact.bind(this)}
                                        ></Contact>)
        }

        return this.state.components;
    }
    
    update = () =>{
        this.props.update();
        this.state.components = [];
        this.renderList();
        
    }
    
    render() {
        return (
            <div style={this.list}>
                
                <List style={{overflowY: 'hidden'}} component="nav" aria-label="main mailbox folders">
                    <div style={{display: 'inline-block', height: '10px'}}></div>
                    {this.renderList()}    
                    <AddContact retContact={this.props.retContact} update={this.update}></AddContact>    
                    <div style={{display: 'inline-block', height: '30px'}}></div> 
                </List>
                   
            </div>
        )
    }

   

    list = {
        display: 'inline-block',
        width: '30%',
        float: 'left',
        marginLeft: '120px',
        marginTop: '30px'
    }
}

export default ContactsList
