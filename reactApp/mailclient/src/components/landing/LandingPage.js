import React, { Component } from 'react'
import {LoginForm} from './LoginForm'
import {RegistrationForm} from './RegistrationForm'
import Header from './Header'
import Button from '@material-ui/core/Button';
import {Route, NavLink, HashRouter, Redirect } from 'react-router-dom'

export class LandingPage extends Component {
    render() {
        return (
            <HashRouter>
            <div style = {this.LandingPageStyle}>
                <Header></Header>
                <Redirect from="/" to="login" />                
                <Route path="/registration" component={RegistrationForm}/>
                <Route path="/login" component={LoginForm}/>
                
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
