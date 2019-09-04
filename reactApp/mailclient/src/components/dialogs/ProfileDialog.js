import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import './profile.css'

export class ProfileDialog extends Component {

    state = {
        open: false
    }

    handleToggle = () => {
        this.setState({
            open: !this.state.open
        }) ;
    }

    logout = (event) =>{
        localStorage.clear();
        window.location.replace('/login');

        event.preventDefault();
    }

    render() {
        const{open} = this.state
        return (
            <Fragment>
              
                  <div id = 'profileBtn' onClick =  {this.handleToggle}>
                  <i id= 'profileBtnIco' class="far fa-user"></i>
                    
                  </div>
                  
                  <Dialog
                    scroll={'body'}
                    maxWidth={'sm'}
                    fullWidth={true}
                    open={open}
                    onClose={this.handleToggle}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"

                    BackdropProps = {{
                        style: {
                            background: 'rgba(36, 35, 35, 0.85)',
                          },
                    }}
                    
                    PaperProps = {{
                        style: {
                            background: 'transparent',
                            boxShadow: 'none',
                          },
                    }}
                >
                    <DialogTitle style={{margin: 'auto'}} id="alert-dialog-title">{""}</DialogTitle>
                    
                    <div class = 'profileIcoWrapper '>
                        <i id= 'profileIco' class="far fa-user"></i>
                    </div>
                    
                    <div class = 'item '>
                        <i style={this.itemIco} class="fas fa-user-edit"></i>
                        <p style={this.itemText}>
                            Edit Profile
                        </p>
                    </div>

                  

                    <div class = 'item ' >
                        <i style={this.itemIco} class="fas fa-unlock"></i>
                        <p style={this.itemText}>
                            Change Password
                        </p>
                    </div>

                    <div class = 'item ' onClick={this.logout} >
                        <i style={this.itemIco} class="fas fa-sign-out-alt"></i>
                        <p style={this.itemText}>
                            Sign Out
                        </p>
                    </div>

                    <div class = 'item close'  onClick={this.handleToggle} >
                        <i style={this.itemIco} class="fas fa-window-close"></i>
                        <p style={this.itemText}>
                            Close
                        </p>
                    </div>

                    
                </Dialog>   

                
                  
                    
                        
                
            </Fragment>
        )
    }

    itemText = {
        margin: '0',
        fontWeight: '600',
        cursor: 'default',
        display: 'inline-block',
        marginTop: '15px'
    }

    itemIco = {
        display: 'inline-block',
        marginRight: '50px',
        marginLeft: '20px',
        marginTop: '15px'
    }

   
}

export default ProfileDialog
