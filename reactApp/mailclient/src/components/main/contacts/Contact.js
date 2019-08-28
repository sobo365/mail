import React, { Component } from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import './contact.css'

export class Contact extends Component {
    render() {
        return (
            
                <ListItem id = 'contact' button>
                    <ListItemAvatar>
                                <Avatar style={{background: '#6f32ff'}}> <i class="far fa-user"></i></Avatar>   
                    </ListItemAvatar>

                <p style={{width: '100%', display: 'inline', margin: '0'}}>{this.props.displayname}</p>
                
                <p style={{width: '100%', display: 'inline'}}>{this.props.displayname}</p>
                </ListItem>
            
        )
    }

    contact = {
        background: '#EEEEEE',
        width: '85%',
        margin: 'auto',
        borderRadius: '20px',
        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.5)',
        marginTop: '20px'
    }
}

export default Contact
