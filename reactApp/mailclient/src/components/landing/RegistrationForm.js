import React, { Component } from 'react'
import axios from "axios"
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';

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
        }else if(this.state.firstname === ''){
          document.getElementById("errorMessage").innerHTML = 'First name field is empty!';
        }else if(this.state.lastname === ''){
          document.getElementById("errorMessage").innerHTML = 'Last name field is empty!';
        }else{

          axios.post('http://localhost:8080/user/registration', {
            firstname : this.state.firstname,
            lastname: this.state.lastname,
            username: this.state.username,
            password: this.state.password
          })
          .then((response) =>{
            if(response.data.value != null){
              document.getElementById("errorMessage").innerHTML = response.data.value;
            }else{
              this.props.history.push('/regsuccessful');
            }
          })
          .catch(function (error) {
            alert('Error has occured');
          });


        }

        

    }
    
    render() {
        return (
            <div>
                <div className="Registration" style = {this.registrationForm}>
              
              <h3 style = {this.loginTextStyle}>Registration</h3>

              
              <TextField
                    id = 'username'
                    label = 'Username'
                    style = {this.textField}
                    variant='outlined'
                    onChange = {this.handleChangeUsername}
                    onKeyPress = {this.handleEnterKeyPress}
                    value = {this.state.username}>
                  </TextField>
                    
                

                  <TextField
                    type = 'password'
                    label = 'Password'
                    style = {this.textField}
                    variant='outlined'
                    onChange= {this.handleChangePassword}
                    onKeyPress = {this.handleEnterKeyPress}
                    value = {this.state.password}>
                  </TextField>
              
              <TextField
                    id = 'firstname'
                    label = 'First name'
                    style = {this.textField}
                    variant='outlined'
                    value = {this.state.firstname}
                    onKeyPress = {this.handleEnterKeyPress}
                    onChange={this.handleChangeFirstName}>
                  </TextField>

                  <TextField
                    id = 'lastnname'
                    label = 'Last name'
                    style = {this.textField}
                    variant='outlined'
                    value = {this.state.lastname}
                    onKeyPress = {this.handleEnterKeyPress}
                    onChange={this.handleChangeLastName}>
                  </TextField>

                  <p id = 'errorMessage'></p>
                    
          
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

                <div style = {this.image}>
                    <img 
                    src="https://images.vexels.com/media/users/3/145819/isolated/preview/486c34cf5b3b4badd52bc427dbeb44a1-rocket-cartoon-by-vexels.png" alt="Smiley face" height="200" width="200" />
                </div>

              
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
      background: '#2CA8FF',
      padding: '15px',
      width: '73%',
      margin: '10px',
      fontSize: '27px'
    }

}

export default RegistrationForm
