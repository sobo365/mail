import React, { Component } from 'react';
import Sidebar from '../sidebar/Sidebar';
import AddContact from '../../dialogs/ContactDialog';

export class Contacts extends Component {
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
                <Sidebar contacts></Sidebar> 
                <AddContact></AddContact>
                 <h3>Contacts</h3>                

                
                
            </div>
        )
    }
}

export default Contacts
