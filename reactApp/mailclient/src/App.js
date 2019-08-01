import React from 'react';
import LandingPage from './components/landing/LandingPage'
import Main from './components/main/Main'
import './App.css';
import {Route, NavLink, HashRouter, Redirect } from 'react-router-dom'


function App() {
  return (
    <HashRouter>
      <div className="App">
        <Route path="/" component={LandingPage}/>
        <Route path="/main" component={Main}/>
      </div>
    </HashRouter>
  );
}

export default App;
