import React, { Component } from 'react'
import Sidebar from '../sidebar/Sidebar'
import FoldersSidebar from './FoldersSidebar'
import axios from 'axios'
import Compose from '../../dialogs/Compose';
import EmailList from '../emails/EmailListPaper'
import ChildFolder from './ChildFolder'

export class Folders extends Component {
    constructor(props){
        super(props);

        this.state = {
            username: '',
            folders: [],
            messages: []
        }
    }

    componentDidMount() {

        if(localStorage.getItem('token') == null){
            this.props.history.push('/login');
        }
        this.state.username = localStorage.getItem('username');

        var token = localStorage.getItem('token');

        axios({
            method: 'GET',
            url: 'http://localhost:8080/folders',
            headers: {
                Authorization: 'Bearer ' + token
            },
            params: {
                id : localStorage.getItem('account_id')
            }
        }).then((response) => {
            this.setState({
                folders: response.data
            })
        })

     }

     update = () =>{
         this.componentDidMount();
     }

     getMessages = (messagesVal) => {
        this.setState({
            messages: messagesVal
        })
    }
     

    render() {
        return (
            <div>
                <Sidebar folders></Sidebar> 
                <Compose></Compose>

                <div style={this.list}>
                    <EmailList  messages={this.state.messages}></EmailList>
                </div>
                
                <FoldersSidebar messages = {this.getMessages.bind(this)} updateFolders = {this.update} folders = {this.state.folders}></FoldersSidebar>             

                
                
            </div>
        )
    }

    childFolder = {
        float: 'left',
        margin: '20px',
        
        listStyle: 'none'
    }

    list = { 
        overflow: 'hidden',
        width: '73%',
        margin:'auto',
        float: 'left',
        marginLeft: '30px',
        marginBottom: '120px'
    }

    childFolders = {
        height: '85px',
        borderBottom: '1px solid #BDBDBD'
    }

}

export default Folders
