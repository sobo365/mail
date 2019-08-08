import React from 'react';
import LandingPage from './components/landing/LandingPage'
import Home from './components/main/home/Home'
import Accounts from './components/main/accounts/Accounts'
import Contacts from './components/main/contacts/Contacts'
import Emails from './components/main/emails/Emails'
import Folders from './components/main/folders/Folders'
import './App.css';
import {Route,  HashRouter, Redirect } from 'react-router-dom'


function App() {
  return (
    <HashRouter>
      <div className="App">
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

export default App;
