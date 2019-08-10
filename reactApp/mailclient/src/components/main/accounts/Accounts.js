import React, { Component } from 'react';
import Sidebar from '../sidebar/Sidebar';
import AccountCard from '../../cards/AccountCard';
import AddAcount from '../../dialogs/AccountDialog';
import axios from 'axios';

export class Accounts extends Component {
    constructor(props){
        super(props);

        this.state = {
            username: '',
            components: 3,
            accountComponents: [],
            accounts: []
        }
    }

    

    componentDidMount() {
        if(localStorage.getItem('token') == null){
            this.props.history.push('/login');
        }
        this.state.username = localStorage.getItem('username');
    
  
     }

     


     componentWillMount (){
        var token = localStorage.getItem('token');
        
        axios({
          method: 'get',
          url: 'http://localhost:8080/account/getAccounts',
          params: {
              id: localStorage.getItem('user_id')
          },
          headers: {
            Authorization: 'Bearer ' + token
          }
        }).then((response) => {
            console.log(response.data)
            for (let i = 0; i < response.data.length; i++) {
                this.state.accountComponents.push(<AccountCard displayname={response.data[i].displayname} 
                                                                id={response.data[i].id}
                                                                update={this.update}
                                                                smtpAddress={response.data[i].smtpAddress}
                                                                smtpPort={response.data[i].smtpPort}
                                                                username={response.data[i].username}></AccountCard>)
            }
            this.forceUpdate()
           
          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {
            // always executed
          }); 


          
     }

     update = () =>{
         this.state.accountComponents = []
         this.componentWillMount()
         this.renderAccounts()
     }
     

     renderAccounts = () =>{
        return this.state.accountComponents
     }

    render() {
        return (
            <div>
                <Sidebar accounts></Sidebar> 
                <AddAcount update={this.update}></AddAcount>
          
                
                <div style = {this.content}>
               
                {this.renderAccounts()} 
                   
                    
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
