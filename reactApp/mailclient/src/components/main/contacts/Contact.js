import React, { Component, Fragment } from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ListItemText from '@material-ui/core/ListItemText';
import './contact.css'

export class Contact extends Component {

    constructor(props){
        super(props)

        this.state = {
            contact:{
                displayname: this.props.displayname
            }
        }
    }

    handleClick = () =>{
        this.props.getContact(this.state.contact);
    }

    

    render() {
        return (
            
                <ListItem id = 'contact' button onClick={this.handleClick}>
                    <ListItemAvatar>
                                <Avatar style={{background: 'transparent'}}> <i style={{fontSize: '30px'}} class="far fa-user"></i></Avatar>   
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
