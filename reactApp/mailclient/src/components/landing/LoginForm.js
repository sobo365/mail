import React, { Component } from 'react'
//import { FormGroup, FormControl } from "react-bootstrap"
import {FormControl, InputLabel, Input, FormHelperText} from '@material-ui/core'
import axios from "axios"
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import { NavLink, Link, Redirect} from 'react-router-dom'


export class LoginForm extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: ''
        };
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
      }

    handleChangeUsername = event =>{
        this.setState({
            username: event.target.value
        });
    }

    handleChangePassword = event =>{
      this.setState({
        password : event.target.value
      });
    }

    handleSubmit = event =>{

        if(this.state.username === ''){
          alert('Please enter a username!');
        }else if(this.state.password === ''){
          alert('Please enter a password!');
        }else{
          axios.post('http://localhost:8080/auth/login', {
            username: this.state.username,
            password: this.state.password
          })
          .then(function (response) {
            console.log(response.data.access_token);
            localStorage.setItem('token', response.data.access_token);
            alert('OK');
          })
          .catch(function (error) {
            alert('Wrong username or password');
          });
        }

      

        event.preventDefault();
    }

    handleRedirect = () => {
      this.props.history.push('/registration')
    }

    
    render() {
        return (
            <div className="Login" style = {this.loginForm}>
              
              <h3 style = {this.loginTextStyle}>Log In</h3>
              
                  <TextField
                    id = 'username'
                    label = 'Username'
                    style = {this.textField}
                    variant='outlined'
                    value={this.state.username} 
                    onChange={this.handleChangeUsername}>
                  </TextField>
                    
                

                  <TextField
                    type = 'password'
                    label = 'Password'
                    style = {this.textField}
                    variant='outlined'
                    value={this.state.password} 
                    onChange={this.handleChangePassword}>
                  </TextField>
                    
          
                  <Button
                    style = {this.loginBtnStyle}
                    onClick={this.handleSubmit}  
                    variant = 'contained'
                    type="submit">
                    Log In
                  </Button>
                 

                <Button
                    style = {this.btn}
                    onClick = {this.handleRedirect}>
                  Registration
                </Button>

                  {/* <Button style = {this.btn}> <NavLink   to ="/registration">Registration</NavLink></Button> */}
              
      </div>
        );
    }

     btn = {
        display: 'block',
        margin: 'auto',
        fontSize: '18px'
    }

    loginForm = {
      
      marginTop: '4%',
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

    loginBtnStyle = {
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

export default LoginForm

