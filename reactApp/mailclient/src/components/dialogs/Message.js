import React, { Component, Fragment } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import './Message.css'

export class Message extends Component {

    state = {
        open: false,
        unread : this.props.unread
    }

    

    handleToggle = () => {
        this.setState({
            open: !this.state.open,
            content: '',
            subject: '',
            from: '',
            
        }) ;
    }

    openMessage = () => {
        var token = localStorage.getItem('token');
        
        axios({
          method: 'get',
          url: 'http://localhost:8080/mail/read',
          params: {
              id: this.props.id
          },
          headers: {
            Authorization: 'Bearer ' + token
          }
        }).then((response) => {
            this.handleToggle();
           this.setState({
            unread: false
           })
           
          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {
            // always executed
          }); 
    }

    formatDate = () =>{
        let current = new Date();
        let date = new Date(this.props.dateTime);
        let retVal = ''
        if((current - date) <= 82800000){
            let hours = date.getHours();
            let mins = date.getMinutes();
            if(hours.toString().length == 1){
                hours = '0' + hours;
            }
            if(mins.toString().length == 1){
                mins = '0' + mins;
            }
            retVal = hours + ':' + mins;
        }else{
            retVal = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();
        }

        return retVal;


    }

    render() {
        const{open} = this.state
        return (
            <Fragment>
                <ListItem style={this.state.unread ? this.unread: this.read} button alignItems="flex-start" onClick={this.openMessage}>
                        <ListItemAvatar>
                            {/* <Avatar style={{background: '#6f32ff'}}> <i class="far fa-user"></i></Avatar> */}
                            <Avatar style={{background: '#6f32ff'}}>{this.props.from[0].toUpperCase()}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                        
                        primary={
                            <Box fontWeight={this.state.unread ? "fontWeightBold" : "fontWeightRegular"} m={1} 
                                    style={{display: 'inline-block', margin: '0', fontSize: '18px'}}>
                                   {this.props.subject ? this.props.subject : 'No Subject'} 
                            </Box>
                            
                        }
                        secondary={
                            <Fragment>
                            <Typography
                                style={{display: 'inline-block'}}
                                component="span"
                                variant="body2"
                                fontWeight= 'fontWeightBold'
                                color="textPrimary" >
                                <Box fontWeight={this.state.unread ? "fontWeightBold" : "fontWeightRegular"} m={1} 
                                    style={{display: 'inline-block', margin: '0', fontSize: '16px'}}>
                                    {this.props.from}
                                </Box>
                            </Typography>
                            {" — " + this.props.content.substring(0,30) + ' ...'}
                            </Fragment>
                        }
                        />

                       <i style={{display: this.state.unread ? 'inline-block' : 'none', margin: '16px' , color: '#6f32ff'}}  class="fas fa-circle"></i>
                       <p style={{display:'inline-block'}}> {this.formatDate()}</p>
                       
                        
                    </ListItem>
                    <Divider variant="inset" component="li" />



                <Dialog
                    scroll={'body'}
                    maxWidth={'xl'}
                    fullWidth={true}
                    open={open}
                    
                    BackdropProps = {{
                        style: {
                            backgroundColor: 'rgba(	38,50,56, 1.0)',
                            boxShadow: 'none',
                          },
                    }}
                    onClose={this.handleToggle}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle style={{margin: 'auto'}} id="alert-dialog-title">
                        {this.props.subject ? this.props.subject: 'No Subject'}
                        <div style = {{display: 'inline-block', float: 'right'}}>
                            <i 
                            id = 'closeBtn'
                            onClick = {this.handleToggle}
                            class="fas fa-times"></i>
                        </div>

                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText style={this.messageContent} id="alert-dialog-description">
                        {this.props.content}
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                   
                    </DialogActions>
                </Dialog>               
                
            </Fragment>
        )
    }

    messageContent = {
        margin: '35px'
    }

    unread = {
        fontWeight: '600'
    }

    read = {
        
    }

   
    
}

export default Message
