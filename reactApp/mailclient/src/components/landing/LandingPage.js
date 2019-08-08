import React, { Component } from 'react'
import {LoginForm} from './LoginForm'
import {RegistrationForm} from './RegistrationForm'
import SuccessfulRegistration from './SuccessfulRegistration'
import Header from './Header'
import {Route, NavLink, HashRouter, Redirect, BrowserRouter } from 'react-router-dom'

export class LandingPage extends Component {

    componentDidMount() {
        if(localStorage.getItem('token') == null){
            this.props.history.push('/login');
        }else{
            window.location.replace('/#/home')
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
                
                
                
            </div>
            </HashRouter>
        )
    }

  

    
    


    

    LandingPageStyle = {
        textAlign: 'center',
        
    }
}

export default LandingPage
