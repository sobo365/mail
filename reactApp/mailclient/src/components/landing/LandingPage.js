import React, { Component } from 'react'
import {LoginForm} from './LoginForm'
import {RegistrationForm} from './RegistrationForm'
import SuccessfulRegistration from './SuccessfulRegistration'
import Header from './Header'
import Button from '@material-ui/core/Button';
import {Route, NavLink, HashRouter, Redirect } from 'react-router-dom'

export class LandingPage extends Component {

    componentDidMount() {
        if(localStorage.getItem('token') == null){
            this.props.history.push('/login');
        }else{
            this.props.history.push('/main');
        }
     }

    render() {
        return (
            <HashRouter>
            <div style = {this.LandingPageStyle}>    
                <Route path='/regsuccessful' component={Header}/>            
                <Route path="/registration" component={Header}/>
                <Route path="/login" component={Header}/>              
                <Route path="/registration" component={RegistrationForm}/>
                <Route path="/login" component={LoginForm}/>
                <Route path='/regsuccessful' component={SuccessfulRegistration}/>
                
                <div style = {this.image}>
                    <img 
                    src="https://images.vexels.com/media/users/3/145819/isolated/preview/486c34cf5b3b4badd52bc427dbeb44a1-rocket-cartoon-by-vexels.png" alt="Smiley face" height="200" width="200" />
                </div>
                
            </div>
            </HashRouter>
        )
    }

  

    
    


    image = {
        userSelect: 'none',
        position: 'absolute',
        marginLeft: '70%',
        top : '100px',
        transform : 'rotate(45deg)'
    }

    LandingPageStyle = {
        textAlign: 'center',
        
    }
}

export default LandingPage
