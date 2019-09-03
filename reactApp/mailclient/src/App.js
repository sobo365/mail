import React, { Component } from 'react';
import LandingPage from './components/landing/LandingPage'
import Home from './components/main/home/Home'
import Accounts from './components/main/accounts/Accounts'
import Contacts from './components/main/contacts/Contacts'
import Emails from './components/main/emails/Emails'
import Folders from './components/main/folders/Folders'
import './App.css';
import {Route,  HashRouter } from 'react-router-dom'
import axios from 'axios'
import NewMessage from './components/snackbars/NewMessage'


export class App extends Component {

  constructor(props){
    super(props);

    this.state = {
        snackbar: false,
        snackBarMessage: ''
    }
}

   interval = setInterval(() => {
    var token = localStorage.getItem('token');
        
    if(localStorage.getItem('account_id') != null){
    axios({
      method: 'get',
      url: 'http://localhost:8080/mail/check',
      params: {
          id: localStorage.getItem('account_id')
      },
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then((response) => {
      if(response.data.value != null){
        
        this.setState({
          snackbar: true,
          snackBarMessage : response.data.value
        })


        
      }else{
        this.setState({
          snackbar: false,
          snackBarMessage : ''
        })
      }

      
       
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      }); 
     }}, 5000);

  render() {
    return(
    <HashRouter>
        
          <div className="App">



            <NewMessage open={this.state.snackbar} message = {this.state.snackBarMessage}></NewMessage>
            
         
            
            <Route path="/"  component={LandingPage}/>
            <Route path="/home" component={Home}/>
            <Route path='/accounts' component={Accounts}/>
            <Route path='/emails' component={Emails}/>
            <Route path='/contacts' component={Contacts}/>
            <Route path='/folders' component={Folders}/>

          </div>
        </HashRouter>
    );  
}
    
}

export default App;
