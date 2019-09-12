import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Sidebar from '../sidebar/Sidebar';
import Compose from '../../dialogs/Compose';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Message from '../../dialogs/Message';
import EmailList from './EmailListPaper';


export class Emails extends Component {
    constructor(props){
        super(props);

        this.state = {
            username: '',
            messages: []
        }
    }

    componentWillMount() {
        if(localStorage.getItem('token') == null){
            this.props.history.push('/login');
        }
        this.state.username = localStorage.getItem('username');


     }

     componentDidMount(){
       
        this.getMessages('');

     }

     getMessages = (filterValue) =>{
      var token = localStorage.getItem('token');
        
      axios({
        method: 'get',
        url: 'http://localhost:8080/mail',
        params: {
            id: localStorage.getItem('account_id'),
            filter: filterValue
        },
        headers: {
          Authorization: 'Bearer ' + token
        }
      }).then((response) => {
          console.log(response.data);
          this.setState({
            messages: response.data
          })
         
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
          // always executed
        }); 
     }

     getFilter = (filter) => {
       this.getMessages(filter);
     }
     

    render() {
        return (
            <div >
         
                <Sidebar emails></Sidebar> 
                <Compose></Compose>
                <div style={this.list}>
                <EmailList  searchBox menuAvailable={true} filter={this.getFilter.bind(this)} messages={this.state.messages}></EmailList>
                </div>
                

                
                
            </div>
        )
    }

    list = {
      overflow: 'hidden',
        width: '92%',
        float: 'left',
        marginLeft: '124px',
        marginBottom: '120px'
    }

    
}

export default Emails
