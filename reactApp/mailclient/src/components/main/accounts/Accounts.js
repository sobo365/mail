import React, { Component } from 'react';
import Sidebar from '../sidebar/Sidebar';
import AccountCard from '../../cards/AccountCard';
import AddAcount from '../../dialogs/AccountDialog';


export class Accounts extends Component {
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
                <Sidebar accounts></Sidebar> 
                <AddAcount></AddAcount>
          
                
                <div style = {this.content}>
            
                    <AccountCard></AccountCard>
                    <AccountCard></AccountCard>
                    <AccountCard></AccountCard>
                    <AccountCard></AccountCard>
                    <AccountCard></AccountCard>
                    <AccountCard></AccountCard>
                    <AccountCard></AccountCard>
                    <AccountCard></AccountCard>
                    <AccountCard></AccountCard>
                   
                    
                </div>                    
                
            </div>
        )
    }

    content = {
        align: 'auto',
        marginRight: '20px',
        width: '80%',
        float: 'right',
        marginBottom: '120px'
    }

    card = {
        position: 'fixed'
    }
}

export default Accounts
