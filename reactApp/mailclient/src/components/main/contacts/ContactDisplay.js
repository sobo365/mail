import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import EmailList from '../emails/EmailListPaper'
import axios from 'axios';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';

export class ContactDisplay extends Component {

    constructor(props){
        super(props);

        this.state = {
            username: '',
            folders: [],
            messages: []
        }
    }

    componentDidMount() {

        if(localStorage.getItem('token') == null){
            this.props.history.push('/login');
        }
        this.state.username = localStorage.getItem('username');

        var token = localStorage.getItem('token');
        axios({
            method: 'GET',
            url: 'http://localhost:8080/mail/getByFolder',
            headers: {
                Authorization: 'Bearer ' + token
            },
            params: {
                accountId : localStorage.getItem('account_id'),
                folderId: 1
            }
        }).then((response) => {
            this.setState({
                messages: response.data
            })
        })

        this.setState({
            active: true
        })

     }

    render() {
        return (
            <div>
                <div style = {this.display}>
                    
                {/* <div style={this.profilePhoto}>
                        <Avatar style={this.avatar}> <i class="far fa-user"></i></Avatar>   
                    </div> */}
                    <div style = {this.profileData}>
                        <p style={this.profileDataTitle}>{this.props.contact.displayname}</p>
                        
                        
                    </div>
                </div>
                        
                
                <div style = {this.displayMessages}>
                    <div style={this.list}>
                        <div style={this.messageHeader}>
                            <p style={this.messageTitle}>Messages</p>
                        </div>
                        <EmailList menuAvailable={false} messages={this.state.messages}></EmailList>
                    </div>
                </div>
            </div>
            

        )
    }

    profileDataTitle = {
        fontSize: '40px',
        fontWeight: '600',
        color: '#ff5722',
        margin: '0',
        fontFamily: 'Roboto ',
        letterSpacing: '2px'
    }

    


    messageTitle = {
        margin: '0',
        
    }

    messageHeader = {
        width: '100%',
        height: '15%',
        background: '#E0E0E0',
        fontWeight: '500',
        color: '#1A237E',
        fontSize: '21px',
        
    }

    avatar = {
        
        background: '#6f32ff',
        height: '100px',
        width: '100px',
        display: 'inline-block'
    }

    contact = {
        height: '100%',
        width: '100%',
        margin : '0'
    }

    note = {
        bottom: '0',
        width: '100%',
        height: '30%',
        borderRadius: '0px 0px 10px 10px'
    }

    display = {
        position: 'fixed',
        display: 'inline-block',
        width: '50%',
        height: '35%',
        marginTop: '55px',
        marginRight: '100px',
        borderRadius: '10px',
        right: '0',
        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.5)'
    }

    displayMessages = {
        overflow: 'auto',
        position: 'fixed',
        display: 'inline-block',
        width: '50%',
        height: '40%',
        margin: '50px',
        marginRight: '100px',
        borderRadius: '10px',
        right: '0',
        bottom: '0',
        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.5)'
    }

    list = {
        overflow: 'hidden',
        width: '100%',
        
    }
}

export default ContactDisplay
