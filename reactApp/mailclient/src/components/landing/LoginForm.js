import React, { Component } from 'react'
import axios from "axios"
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';


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

    handleEnterKeyPress = event => {
      if(event.key === 'Enter'){
        this.handleSubmit(event);
      }
    }


    handleSubmit = event =>{


        if(this.state.username === ''){
          document.getElementById("errorMessage").innerHTML = 'Username field is empty!';
        }else if(this.state.password === ''){
          document.getElementById("errorMessage").innerHTML = 'Password field is empty!';
        }else{
          axios.post('http://localhost:8080/user/authentication', {
            username: this.state.username,
            password: this.state.password
          })
          .then((response) => {
            console.log(response.data.access_token);
            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('user_id', response.data.user_id);
            localStorage.setItem('username', response.data.username);
            try{
              window.location.replace('/#/home');
            }catch(e){
              alert(e);
            }
          })
          .catch(function (error) {
            document.getElementById("errorMessage").innerHTML = 'Check your username or password!';
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
                    onKeyPress={this.handleEnterKeyPress}
                    onChange={this.handleChangeUsername}>
                  </TextField>
                    
                

                  <TextField
                    type = 'password'
                    label = 'Password'
                    style = {this.textField}
                    variant='outlined'
                    value={this.state.password} 
                    onKeyPress={this.handleEnterKeyPress}
                    onChange={this.handleChangePassword}>
                  </TextField>
                    
                  <p id = 'errorMessage'></p>
          
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

                <div style = {this.image}>
                    <img 
                    src="https://images.vexels.com/media/users/3/145819/isolated/preview/486c34cf5b3b4badd52bc427dbeb44a1-rocket-cartoon-by-vexels.png" alt="Smiley face" height="200" width="200" />
                </div>

                              
      </div>
   
        );
    }

    image = {
      userSelect: 'none',
      position: 'absolute',
      marginLeft: '40%',
      top : '100px',
      transform : 'rotate(45deg)'
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
      background: '#2CA8FF',
      padding: '15px',
      width: '73%',
      margin: '10px',
      fontSize: '27px'
    }
}

export default LoginForm

