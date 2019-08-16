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
            accounts: [],
            colors : ['#ff453a', '#64d2ff', '#ffd600', '#f25abf', '#ff375f', '#ff9f10', '#e65c71', '#30d158', '#98989d', '#0a84ff']
        }
    }

    getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
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
                                                                color = {this.state.colors[this.getRandomInt(this.state.colors.length)]}
                                                                smtpAddress={response.data[i].smtpAddress}
                                                                smtpPort={response.data[i].smtpPort}
                                                                username={response.data[i].username}></AccountCard>)
            }
            this.state.accountComponents.push(<AddAcount update={this.update}></AddAcount>)
            this.forceUpdate()
           
          })
          .catch( (error) => {
            this.state.accountComponents.push(<AddAcount update={this.update}></AddAcount>)
            console.log(error);
          })
          .then(() => {
            
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
                
                <p style={this.title}>Accounts</p>
          
                
                <div style = {this.content}>
                
                {this.renderAccounts()} 
               
                
                </div>                    
                
            </div>
        )
    }

    title = {
        fontSize: '37px',
        fontWeight: '500',
        color: '#3b3462',
        float: 'left',
        marginLeft: '13%',
        position: 'fixed'
    }

    content = {
        align: 'auto',
        marginRight: '20px',
        width: '85%',
        float: 'right',
        marginTop: '100px',
        marginBottom: '120px'
    }

    card = {
        position: 'fixed'
    }
}

export default Accounts
