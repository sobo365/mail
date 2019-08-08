import React, { Component } from 'react'
import axios from 'axios'
import Sidebar from '../sidebar/Sidebar'
import Compose from '../../dialogs/Compose'

export class Emails extends Component {
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
                <Sidebar emails></Sidebar> 
                <Compose></Compose>
                 <h3>Emails</h3>                

                
                
            </div>
        )
    }
}

export default Emails
