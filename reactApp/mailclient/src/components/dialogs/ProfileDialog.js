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
import TextField from '@material-ui/core/TextField';
import './profile.css'

export class ProfileDialog extends Component {

    state = {
        open: false,
        editProfile: false,
        changePassword: false,

        newPasswordInput: '',
        newPasswordInputErrorText: '',
        newPasswordInputErrorValue : false,

        reNewPasswordInput: '',
        reNewPasswordInputErrorText: '',
        reNewPasswordInputErrorValue : false
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

    handleProfileEditOpen = () =>{
        this.setState({
            open: false,
            editProfile: true
        })
    }

    handleProfileEditClose = () =>{
        this.setState({
            editProfile: false,
            open: true
        })
    }

    changePasswordOpen = () =>{
        this.setState({
            open: false,
            changePassword: true,
            newPasswordInput: '',
            newPasswordInputErrorText: '',
            newPasswordInputErrorValue : false,
            reNewPasswordInput: '',
            reNewPasswordInputErrorText: '',
            reNewPasswordInputErrorValue : false
        })
    }

    changePasswordClose = () =>{
        this.setState({
            open: true,
            changePassword: false
        })
    }


    handleNewPasswordInput = event =>{
        if(event.target.value.trim() === ''){
          this.setState({
            newPasswordInputErrorValue: true,
            newPasswordInputErrorText: 'Empty field!',
            newPasswordInput: ''
          });
        }else{
          this.setState({
            newPasswordInputErrorValue: false,
            newPasswordInputErrorText: '',
            newPasswordInput: event.target.value
          });
        }
        
    }

    handleReNewPasswordInput = event =>{
        if(event.target.value.trim() === ''){
          this.setState({
            reNewPasswordInputErrorValue: true,
            reNewPasswordInputErrorText: 'Empty field!',
            reNewPasswordInput: ''
          });
        }else{
          this.setState({
            reNewPasswordInputErrorValue: false,
            reNewPasswordInputErrorText: '',
            reNewPasswordInput: event.target.value
          });
        }
        
    }

    handlePasswordChange = () =>{
        var token = localStorage.getItem('token');
        if(this.state.newPasswordInput === this.state.reNewPasswordInput){
            axios({
                method: 'post',
                url: 'http://localhost:8080/user/changePassword',
                params: {
                    userId: localStorage.getItem('user_id'),
                    newPassword: this.state.newPasswordInput
                },
                headers: {
                  Authorization: 'Bearer ' + token
                }
              }).then((response) => {
                this.changePasswordClose();
                 
                })
                .catch(function (error) {
                  console.log(error);
                })
                .then(function () {
                  // always executed
                }); 
        }else{
            alert("Passwords doesn't match")
        }
        
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
                            background: '#FFFFFF',
                            boxShadow: 'none',
                            borderRadius: '20px'
                          },
                    }}
                >
                    <DialogTitle style={{margin: 'auto'}} id="alert-dialog-title">{""}</DialogTitle>
                    
                    <div class = 'profileIcoWrapper '>
                        <i id= 'profileIco' class="far fa-user"></i>
                    </div>
                    <div id = 'displaynameWrapper'>
                        <p id = 'userDisplayName'>Bonko Zvogdan</p>
                    </div>
                    
                    <div class = 'item ' onClick={this.handleProfileEditOpen}>
                        <i style={this.itemIco} class="fas fa-user-edit"></i>
                        <p style={this.itemText}>
                            Edit Profile
                        </p>
                    </div>

                  

                    <div class = 'item ' onClick={this.changePasswordOpen} >
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

                   
                <Dialog
                    maxWidth={'sm'}
                    fullWidth={true}
                    open={this.state.editProfile}
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
                
                    <DialogTitle id="alert-dialog-title">
                    
                    

                    
                    </DialogTitle>
                    <DialogContent id = 'changePasswordDialogContent'>
                    <i onClick={this.handleProfileEditClose} id = 'backButton' class="fas fa-chevron-left"></i>
                    <p id = 'dialogTitle'>Edit Profile</p>

                    <TextField
                        onChange={this.handleChangeFolderName}
                        value={this.state.username} 
                        label="First Name"
                        style={this.form}
                        margin="normal"
                        variant="outlined"
                        error = {this.state.errorValue}
                        helperText={this.state.errorText}/>

                    <TextField
                        onChange={this.handleChangeFolderName}
                        value={this.state.username} 
                        label="First Name"
                        style={this.form}
                        margin="normal"
                        variant="outlined"
                        error = {this.state.errorValue}
                        helperText={this.state.errorText}/>
                    

                    <TextField
                        onChange={this.handleChangeFolderName}
                        value={this.state.username} 
                        label="Last Name"
                        style={this.form}
                        margin="normal"
                        variant="outlined"
                        error = {this.state.errorValue}
                        helperText={this.state.errorText}/>

                    <Button onClick={this.handlePasswordChange} variant="contained"  id = 'submitBtn'>
                        Submit
                    </Button>
                    
                        
                    </DialogContent>
                </Dialog>  
                  
                  

                <Dialog
                    maxWidth={'sm'}
                    fullWidth={true}
                    open={this.state.changePassword}
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
                
                    <DialogTitle id="alert-dialog-title">
                    
                   

                    
                    </DialogTitle>
                    <DialogContent id = 'changePasswordDialogContent'>
                    <i onClick={this.changePasswordClose} id = 'backButton' class="fas fa-chevron-left"></i>
                    <p id = 'dialogTitle'>Change Password</p>

                    <TextField
                        onChange={this.handleNewPasswordInput}
                        value={this.state.newPasswordInput} 
                        label="New Password"
                        style={this.form}
                        margin="normal"
                        variant="outlined"
                        error = {this.state.newPasswordInputErrorValue}
                        helperText={this.state.newPasswordInputErrorText}/>
                    

                    <TextField
                        onChange={this.handleReNewPasswordInput}
                        value={this.state.reNewPasswordInput}  
                        label="Re-enter new password"
                        style={this.form}
                        margin="normal"
                        variant="outlined"
                        error = {this.state.reNewPasswordInputErrorValue}
                        helperText={this.state.reNewPasswordInputErrorText}/>
                    
                    <Button onClick={this.handlePasswordChange} variant="contained"  id = 'submitBtn'>
                        Submit
                    </Button>
                        
                    </DialogContent>
                </Dialog>  
                    
                        
                
            </Fragment>
        )
    }

    

    form = {
        width: '100%'
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
        marginLeft: '30px',
        marginTop: '15px'
    }

   
}

export default ProfileDialog
