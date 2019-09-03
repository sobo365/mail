import React, { Fragment, Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import axios from 'axios';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';

export class AccountDialog extends Component{

    state = {
        open: false,
        reload: true,

        smtpAddress: '',
        smtpAddressErrorValue: false,
        smtpAddressErrorMessage: '',

        smtpPortErrorValue: false,
        smptPortErrorMessage: 'false',
        smtpPort: '',

        usernameErrorValue: false,
        usernameErrorMessage: '',
        username: '',   

        passwordErrorValue: false,
        passwordErrorMessage: '',
        password: '',

        displayname: '',
        displaynameErrorValue: false,
        displaynameErrorMessage: '',

        userId: ''
    }

    Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
    });

  

    handleToggle = () => {
           this.setState({
                 
               open: !this.state.open,
               errorText: '',
               errorValue:false,

               smtpAddressErrorMessage: '',
               smtpAddress: this.props.smtpAddress,
               smtpAddressErrorValue: false,

               smtpPortErrorValue: false,
               smtpPortErrorMessage: '',
               smtpPort: this.props.smtpPort,

               displayname: this.props.displayname,
               displaynameErrorValue: false,
               displaynameErrorMessage: '',

               usernameErrorValue: false,
               usernameErrorMessage: '',
               username: this.props.username,   

               passwordErrorValue: false,
               passwordErrorMessage: '',
               password: this.props.password,
           }) 
    }

    
    handleChangeSmtpAddress = event =>{
        if(event.target.value.trim() === ''){
          this.setState({
            smtpAddressErrorValue: true,
            smtpAddressErrorMessage: 'Empty field!',
            smtpAddress: ''
          });
        }else{
          this.setState({
            smtpAddressErrorValue: false,
            smtpAddressErrorMessage: '',
            smtpAddress: event.target.value
          });
        }
        
    }

    handleChangeDisplayName = event =>{
        if(event.target.value.trim() === ''){
          this.setState({
            displaynameErrorValue: true,
            displaynameErrorMessage: 'Empty field!',
            displayname: ''
          });
        }else{
          this.setState({
            displaynameErrorValue: false,
            displaynameErrorMessage: '',
            displayname: event.target.value
          });
        }
        
    }

    handleChangeUsername = event =>{
        if(event.target.value.trim() === ''){
          this.setState({
            usernameErrorValue: true,
            usernameErrorMessage: 'Empty field!',
            username: ''
          });
        }else{
          this.setState({
            usernameErrorValue: false,
            usernameErrorMessage: '',
            username: event.target.value
          });
        }        
    }

    handleChangePassword = event =>{
        if(event.target.value.trim() === ''){
          this.setState({
            passwordErrorValue: true,
            passwordErrorMessage: 'Empty field!',
            password: ''
          });
        }else{
          this.setState({
            passwordErrorValue: false,
            passwordErrorMessage: '',
            password: event.target.value
          });
        }        
    }

    handlePortChange = event =>{
        if(event.target.value === ''){
            this.setState({
              smtpPortErrorValue: true,
              smtpPortErrorMessage: 'Empty field!',
              smtpPort: ''
            });
          }else{
            this.setState({
              smtpPortErrorValue: false,
              smtpPortErrorMessage: '',
              smtpPort: event.target.value
            });
          }        
    }

    handleSubmit = () =>{
        if(this.state.displayname.trim() === ''){
            this.setState({
                displaynameErrorValue: true,
                displaynameErrorMessage: 'Empty field!'
                
              });
        }else if(this.state.username.trim() === ''){
            this.setState({
                usernameErrorValue: true,
                usernameErrorMessage: 'Empty field!'
               
              });
        }else if(this.state.password.trim() === ''){
            this.setState({
                displaynameErrorValue: true,
                displaynameErrorMessage: 'Empty field!'
                
              });
        }else if(this.state.smtpAddress.trim() === ''){
            this.setState({
                
                smtpAddressErrorValue: true,
                smtpAddressErrorMessage: 'Empty field!'
                
              });
        }else if(this.state.smtpPort === ''){
            this.setState({
                smtpPortErrorValue: true,
                smtpPortErrorMessage: 'Empty field!',
                
              });
        }else if(typeof(parseInt(this.state.smtpPort)) != 'number'){
          this.setState({
              smtpPortErrorValue: true,
              smtpPortErrorMessage: 'Port most be a number!',
              
            });
      }else{

          var token = localStorage.getItem('token');
          axios({
            method: 'post',
            url: 'http://localhost:8080/account/update',
            data: {
              id: this.props.id,
              username: this.state.username,
              password: this.state.password,
              displayname: this.state.displayname,
              smtpAddress: this.state.smtpAddress,
              smtpPort: this.state.smtpPort,
              user: {
                id: localStorage.getItem('user_id')
              }
             
            },
            headers: {
              Authorization: 'Bearer ' + token
            }
          }).then((response) => {
            this.handleToggle(); 
            this.props.update();
                      
          })
          .catch(function (error) {
            console.log(error);
          })

        }        
    }



    render(){
        
        const{open} = this.state

        
     
        return(
        
        <Fragment>
            
            <IconButton onClick={this.handleToggle}>
                <CreateIcon fontSize="large" style={{color:'#EEEEEE'}}/>
            </IconButton>

            <Dialog 
                style = {this.dialogStyle}
                open={open} 
                TransitionComponent={this.Transition}
                fullWidth={true}
                maxWidth = {'md'}
                aria-labelledby="form-dialog-title">
            <DialogTitle style = {{color: '#1A237E'}} id="form-dialog-title">Update Account
            
            
            <Button 
               
                color="primary" 
                size="large"
                onClick={this.handleSubmit}
                style = {this.btn}>
                Save
              </Button>

            <Button 
               
                color="secondary" 
                size="large"
                onClick={this.handleToggle}
                style = {this.btn}>
                Cancel
              </Button>

                        
            </DialogTitle>
            <DialogContent>

  

              <TextField
                label="Display Name"
                style={this.form}
                margin="normal"
                variant="outlined"
                value={this.state.displayname}
                onChange={this.handleChangeDisplayName}
                error={this.state.displaynameErrorValue}
                helperText={this.state.displaynameErrorMessage}
              />

            <TextField
                label="Username"
                style={this.form}
                margin="normal"
                variant="outlined"
                value={this.state.username}
                onChange={this.handleChangeUsername}
                error={this.state.usernameErrorValue}
                helperText={this.state.usernameErrorMessage}
              />

            <TextField
                label="Password"
                style={this.form}
                margin="normal"
                variant="outlined"
                value={this.state.password}
                onChange={this.handleChangePassword}
                error={this.state.passwordErrorValue}
                helperText={this.state.passwordErrorMessage}
              />

            <TextField
                label="SMTP Address"
                style={this.form}
                margin="normal"
                variant="outlined"
                error={this.state.smtpAddressErrorValue}
                helperText={this.state.smtpAddressErrorMessage}
                onChange={this.handleChangeSmtpAddress}
                value={this.state.smtpAddress} 
              />

            <TextField
                label="SMTP Port"
                style={this.form}
                margin="normal"
                variant="outlined"
                error={this.state.smtpPortErrorValue}
                helperText={this.state.smtpPortErrorMessage}
                onChange={this.handlePortChange}
                value={this.state.smtpPort} 
              />

            
              


            </DialogContent>
            <DialogActions>

            

            </DialogActions>
          </Dialog>
        </Fragment>
        )
        
    }

    plus = {
      color : '#757575',
      fontSize: '60px',
      marginTop: '115px'
    }

    ttip = {
        fontSize: '100px'
    }


    btn = {
      fontSize: '20px',
      fontWeight: '500',
      width: '110px',
      float: 'right',
      marginRight: '10px',
      marginTop: '0px',
    }

    fabIcon = {
        
        fontSize: '30px'
    }


    form = {
      width: '100%'
    }

    fab = {
       bottom : '0',
       right: '0',
       margin : '50px',
       position: 'fixed',
       zIndex: '10'
    }

    cardStyle = {
      color: '#fff',
      background: '#F5F5F5',
      borderRadius: '30px',
      border: '2px dashed #757575',
     //  boxShadow: '0px 4px 30px 2px #E0E0E0 ',
      marginLeft: '13%',
      width: '70%',
      height: '300px',
      maxWidth: '70%',   
      marginTop: '20px',
      marginBottom: '70px',
      transition: '0.5s'
  }
} 
    
export default AccountDialog