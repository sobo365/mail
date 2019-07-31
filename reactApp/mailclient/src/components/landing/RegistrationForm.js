import React, { Component } from 'react'
//import { FormGroup, FormControl } from "react-bootstrap"
import {FormControl, InputLabel, Input, FormHelperText} from '@material-ui/core'
import axios from "axios"
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import { NavLink, Link, Redirect} from 'react-router-dom'

export class RegistrationForm extends Component {

    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: '',
            firstname: '',
            lastname: ''
        }
    }

    handleChangeUsername = event =>{
        this.setState({
            username: event.target.value
        });
    }

    handleChangePassword = event =>{
        this.setState({
            password: event.target.value
        });
    }

    handleChangeFirstName = event =>{
        this.setState({
            firstname: event.target.value
        });
    }

    handleChangeLastName = event =>{
        this.setState({
            lastname: event.target.value
        });
    }
    
    handleRedirect = () => {
        this.props.history.push('/login')
    }

    handleSubmit = event =>{
        
        alert(this.state.username + ' ' + this.state.password + ' ' + this.state.firstname + ' ' + this.state.lastname)

        if(this.state.firstname === ''){

        }else if(this.state.lastname === ''){

        }else if(this.state.username === ''){
            
        }else if(this.state.password === ''){
            
        }else{

            //TODO: post request


        }

    }
    
    render() {
        return (
            <div>
                <div className="Registration" style = {this.registrationForm}>
              
              <h3 style = {this.loginTextStyle}>Registration</h3>
              
              <TextField
                    id = 'firstname'
                    label = 'First name'
                    style = {this.textField}
                    variant='outlined'
                    value = {this.state.firstname}
                    onChange={this.handleChangeFirstName}>
                  </TextField>

                  <TextField
                    id = 'lastnname'
                    label = 'Last name'
                    style = {this.textField}
                    variant='outlined'
                    value = {this.state.lastname}
                    onChange={this.handleChangeLastName}>
                  </TextField>

                  <TextField
                    id = 'username'
                    label = 'Username'
                    style = {this.textField}
                    variant='outlined'
                    onChange = {this.handleChangeUsername}
                    value = {this.state.username}>
                  </TextField>
                    
                

                  <TextField
                    type = 'password'
                    label = 'Password'
                    style = {this.textField}
                    variant='outlined'
                    onChange= {this.handleChangePassword}
                    value = {this.state.password}>
                  </TextField>
                    
          
                  <Button
                    style = {this.registrationBtnStyle}
                    onClick = {this.handleSubmit}
                    variant = 'contained'
                    type="submit">
                    Register
                  </Button>
                 

                <Button
                    style = {this.loginBtn}
                    onClick = {this.handleRedirect}>
                  Log In
                </Button>

              
      </div>
            </div>
        );

    }

    loginBtn = {
        display: 'block',
        margin: 'auto',
        fontSize: '18px'
    }

    registrationForm = {
     // border: '2px solid black',
      display: 'inline-block',
      width : '30vw',
      color: '#616161'
    }

    textField = {
      color: '#0091EA',
      margin: '10px',
      width: '75%',
      borderRadius: '10px',
    }

    loginTextStyle = {
      fontWeight: '300',
      fontSize : '40px'
    }

    registrationBtnStyle = {
      color: '#fff',
      border : 'none',
      borderRadius: '10px',
      background: '#0091EA',
      padding: '15px',
      width: '73%',
      margin: '30px',
      fontSize: '27px'
    }

}

export default RegistrationForm
