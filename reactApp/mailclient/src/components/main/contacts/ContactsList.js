import React, { Component } from 'react';
import List from '@material-ui/core/List';
import Contact from './Contact'

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
                                        displayname = {contact.displayname}
                                        ></Contact>)
        }

        return this.state.components;
    }
    
    
    render() {
        return (
            <div style={this.list}>
                <List style={{overflowY: 'hidden'}} component="nav" aria-label="main mailbox folders">
                    <div style={{display: 'inline-block', height: '10px'}}></div>
                    {this.renderList()}         
                </List>
                   
            </div>
        )
    }

    list = {
        display: 'inline-block',
        width: '35%',
        float: 'left',
        marginLeft: '120px',
        marginTop: '30px'
    }
}

export default ContactsList
