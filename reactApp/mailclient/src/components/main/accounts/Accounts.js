import React, { Component } from 'react';
import Sidebar from '../sidebar/Sidebar';
import AccountCard from './AccountCard';
import AddAcount from '../../dialogs/AccountDialog';
import axios from 'axios';
import Compose from '../../dialogs/Compose';



export class Accounts extends Component {
    constructor(props){
        super(props);

        this.state = {
            username: '',
            components: 3,
            accountComponents: [],
            accounts: [],
            backgrounds : ['linear-gradient(45deg, rgba(255,69,58,1) 30%, rgba(255,118,95,1) 90%)',
                           'linear-gradient(45deg, rgba(100,210,255,1) 30%, rgba(100,249,255,1) 90%)', 
                           'linear-gradient(45deg, rgba(255,214,0,1) 30%, rgba(254,255,0,1) 90%)',
                           'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                           'linear-gradient(45deg, rgba(255,55,95,1) 30%, rgba(255,55,133,1) 90%)', 
                           'linear-gradient(45deg, rgba(255,159,16,1) 30%, rgba(255,208,16,1) 90%)', 
                           'linear-gradient(45deg, rgba(230,92,113,1) 30%, rgba(255,135,154,1) 90%)', 
                           'linear-gradient(45deg, rgba(48,209,88,1) 30%, rgba(71,254,117,1) 90%)', 
                           'linear-gradient(45deg, rgba(152,152,157,1) 30%, rgba(189,195,186,1) 90%)', 
                           'linear-gradient(45deg, rgba(10,132,255,1) 30%, rgba(103,179,255,1) 90%)'],
            colors : ['#ff453a', '#64d2ff','#ffd600', '#2196F3',  '#ff375f', '#ff9f10', '#e65c71', '#30d158', '#98989d', '#0a84ff']
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
            console.log(response.data);
            let clr = 0;
            for (let i = 0; i < response.data.length; i++) {

                this.state.accountComponents.push(<AccountCard displayname={response.data[i].displayname} 
                                                                id={response.data[i].id}
                                                                color = {this.state.colors[clr]}
                                                                background = {this.state.backgrounds[clr]}
                                                                smtpAddress={response.data[i].smtpAddress}
                                                                smtpPort={response.data[i].smtpPort}
                                                                password={response.data[i].password}
                                                                username={response.data[i].username}
                                                                update={this.update}
                                                                ></AccountCard>)
             clr++;
             if(clr > this.state.colors.length){
                clr = 0;
            }
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
                <Compose></Compose>
                <p style={this.title}>Accounts</p>
          
                
                <div style = {this.content}>
                
                {this.renderAccounts()} 
               
                
                </div>                    
                
            </div>
        )
    }

    title = {
        fontSize: '34px',
        fontWeight: '500',
        color: '#2196F3',
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
