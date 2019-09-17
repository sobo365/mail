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
            messages: [],
            filter: '',
            currentFolder: 0
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

    getMessagesFiltered = (filterValue) =>{
        var token = localStorage.getItem('token');
          
        axios({
          method: 'get',
          url: 'http://localhost:8080/mail/getByFolder',
          params: {
              accountId: localStorage.getItem('account_id'),
              filter: filterValue,
              folderId: this.state.currentFolder
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

    getFilter = (filterVal) => {
        this.getMessagesFiltered(filterVal);
    }

    currentFolder = (folderId) => {
        this.setState({
            currentFolder: folderId
        })
    }

    moveMessageRet = (messagePosition) =>{
         this.state.messages.splice(messagePosition, 1);
         this.forceUpdate();
         //alert(messagePosition)
      }
     

    render() {
        return (
            <div>
                <Sidebar folders></Sidebar> 
                <Compose></Compose>

                <div style={this.list}>
                    <EmailList retMessage={this.moveMessageRet.bind(this)} filter={this.getFilter.bind(this)} searchBox menuAvailable messages={this.state.messages}></EmailList>
                </div>
                
                <FoldersSidebar selectedFolder={this.state.currentFolder} currentFolder={this.currentFolder.bind(this)} filter={this.state.filter} messages = {this.getMessages.bind(this)}  updateFolders = {this.update} folders = {this.state.folders}></FoldersSidebar>             

                
                
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
        width: '67.5%',
        float: 'left',
        marginLeft: '120px',
        marginBottom: '120px'
    }

    childFolders = {
        height: '85px',
        borderBottom: '1px solid #BDBDBD'
    }

}

export default Folders
