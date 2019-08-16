import React, { Fragment, Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import Slide from '@material-ui/core/Slide';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import axios from 'axios'
import './Dialogs.css'

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
               smtpAddress: '',
               smtpAddressErrorValue: false,

               smtpPortErrorValue: false,
               smtpPortErrorMessage: '',
               smtpPort: '',

               displayname: '',
               displaynameErrorValue: false,
               displaynameErrorMessage: '',

               usernameErrorValue: false,
               usernameErrorMessage: '',
               username: '',   

               passwordErrorValue: false,
               passwordErrorMessage: '',
               password: '',
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
            url: 'http://localhost:8080/account/add',
            data: {
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
            this.props.update();
            this.handleToggle();           
          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {
            // always executed
          }); 

        }        
    }



    render(){
        
        const{open} = this.state

        
     
        return(
        
        <Fragment>

            {/* <Fab variant="extended" 
                 style={this.fab}
                 onClick={this.handleToggle}
                 aria-label="delete" 
                         >
                             <i class="fas fa-plus"
                                style={this.fabIcon}
                                ></i>
                        Add Account
            </Fab> */}
            {/* <Tooltip 
            style = {this.ttip}
            title="Add Account">
                <Fab  
                onClick={this.handleToggle}
                style={this.fab}
                color="secondary" 
                aria-label="add" 
                size = 'large'>
                  <AddIcon />
                </Fab>
            </Tooltip> */}

            <div 
            className= 'add'
            onClick={this.handleToggle}
            style={this.cardStyle}>
                <i class="fas fa-plus"
                   style={this.plus}></i>
            </div>

            <Dialog 
                style = {this.dialogStyle}
                open={open} 
                TransitionComponent={this.Transition}
                fullWidth={true}
                maxWidth = {'md'}
                aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">New Account</DialogTitle>
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
                value={this.state.smtpAdress} 
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

            <Button 
                variant="contained"
                color="secondary" 
                onClick={this.handleToggle}
                size="large"
                style = {this.btn} >
                Cancel
              </Button>

            <Button 
                variant="contained" 
                color="primary" 
                size="large"
                onClick={this.handleSubmit}
                style = {this.btn}>
                Save
              </Button>

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
      width: '110px',
      marginRight: '22px',
      marginBottom: '5px',
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