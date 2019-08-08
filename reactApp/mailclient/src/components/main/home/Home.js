import React, { Component } from 'react'
import Sidebar from '../sidebar/Sidebar'
import Compose from '../../dialogs/Compose'
import AccountCard from '../../cards/AccountCard'

export class Home extends Component {
    constructor(props){
        super(props);

        this.state = {
            username: ''
        }
    }

    componentDidMount() {
        if(localStorage.getItem('token') == null){
            this.props.history.push('/login');
        }
        this.state.username = localStorage.getItem('username');
     }
     

    render() {
        return (
            <div>
                <Sidebar home></Sidebar> 
                <Compose></Compose>
                <h3>Home Page</h3>                
                <div style = {this.content}>
                
                </div>
                
                
            </div>
        )
    }

    content = {
        marginRight: '20px',
        width: '80%',
        float: 'right'
    }
    
  
}


export default Home
