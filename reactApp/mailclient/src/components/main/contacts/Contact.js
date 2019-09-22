import React, { Component, Fragment } from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ListItemText from '@material-ui/core/ListItemText';
import './contact.css'
import axios from 'axios'

export class Contact extends Component {

    constructor(props){
        super(props)

        this.state = {
            contact:{
                displayname: this.props.displayname,
                firstname: this.props.firstname,
                lastname: this.props.lastname,
                email: this.props.email,
                note: this.props.note,
                photo: this.props.photo,
                id: this.props.id
            }
        }
    }

    handleClick = () =>{

        var token = localStorage.getItem('token');
        axios({
            method: 'GET',
            url: 'http://localhost:8080/mail/getForContact',
            headers: {
                Authorization: 'Bearer ' + token
            },
            params: {
                accountId : localStorage.getItem('account_id'),
                address : this.props.email
            }
        }).then((response) => {
            this.props.getContact(this.state.contact, response.data);
        })

        this.setState({
            active: true
        })

        // this.props.getContact(this.state.contact);
    }

    

    render() {
        return (
            
                <ListItem id = 'contact' button onClick={this.handleClick}>
                    <ListItemAvatar>
                                <Avatar style={{background: 'transparent'}}> 

                                <i style={{fontSize: '30px'}} class="far fa-user"></i> 
                                
                                </Avatar>   
                    </ListItemAvatar>

                    <ListItemText
                        
                        primary={
                            <Box  m={1} fontFamily='Roboto' fontWeight='500' fontSize='21px' color='#FFFFFF' style={{display: 'inline-block', margin: '0'}}>
                                   {this.props.firstname + ' ' + this.props.lastname} 
                            </Box>
                            
                        }
                        secondary={
                            <Fragment>
                            <Typography
                                style={{display: 'inline-block', color: '#FFFFFF'}}
                                component="span"
                                variant="body2"
                                fontFamily='Roboto'
                                fontWeight= '500'
                                color="#FFFFFF" >
                                <Box  m={1}  style={{display: 'inline-block', margin: '0', fontSize: '16px'}}>
                                    {this.props.email}
                                </Box>
                            </Typography>
                           
                            </Fragment>
                        }
                        />
                </ListItem>
            
        )
    }

    contact = {
        width: '85%',
        margin: 'auto',
        borderRadius: '20px',
        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.5)',
        marginTop: '20px'
    }
}

export default Contact
