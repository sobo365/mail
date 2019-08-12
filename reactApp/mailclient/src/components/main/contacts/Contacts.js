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
                <p style={this.title}>Contacts</p>                

                
                
            </div>
        )
    }

    title = {
        fontSize: '35px',
        fontWeight: '500',
        color: '#3b3462',
        float: 'left',
        marginLeft: '13%'
    }
}

export default Contacts
