import React, { Component } from 'react'
import Sidebar from '../sidebar/Sidebar'
import FoldersSidebar from './FoldersSidebar'
import axios from 'axios'
import Compose from '../../dialogs/Compose';
import EmailList from '../emails/EmailListPaper'
import ChildFolder from './ChildFolder'
import Rule from './Rule'
import Button from '@material-ui/core/Button';

export class Folders extends Component {
    constructor(props){
        super(props);

        this.state = {
            username: '',
            folders: [],
            messages: [],
            filter: '',
            currentFolder: 0,
            currentFolderName: 'Inbox',
            deleteBtn: false
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
        if(messagesVal.length == 0){
            this.setState({
                deleteBtn: false
            })
        }else{
            this.setState({
                deleteBtn: true
            })
        }
       
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

    currentFolder = (folderId, folderName) => {
        this.setState({
            currentFolder: folderId            
        })
        if(folderName != null){
            this.setState({
                currentFolderName: folderName
            })
        }
    }

    moveMessageRet = (messagePosition) =>{
         this.state.messages.splice(messagePosition, 1);
         this.forceUpdate();
         //alert(messagePosition)
      }

      deleteFolder = () =>{
        var token = localStorage.getItem('token');
          
        axios({
          method: 'DELETE',
          url: 'http://localhost:8080/folders/deleteFolder',
          params: {
              
              folderId: this.state.currentFolder
          },
          headers: {
            Authorization: 'Bearer ' + token
          }
        }).then((response) => {
            alert()
           
          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {
            // always executed
          }); 
       
      }
     

    render() {
        return (
            <div>
                <Sidebar folders></Sidebar> 
                <Compose></Compose>
                
                <div style={this.list}>
                    <div style={this.folderBar}>
                        <p style={this.folderNameHeader}>{this.state.currentFolderName}</p>
                        
                        <Button
                        onClick={this.deleteFolder}
                        disabled={this.state.deleteBtn}
                        style={this.deleteFolderBtn} variant="outlined" color="secondary" >
                            Delete Folder
                        </Button>
                        <Rule folderId={this.state.currentFolder}></Rule>
                    </div>
                    <EmailList retMessage={this.moveMessageRet.bind(this)} filter={this.getFilter.bind(this)} searchBox menuAvailable messages={this.state.messages}></EmailList>
                </div>
                
                <FoldersSidebar selectedFolder={this.state.currentFolder} currentFolder={this.currentFolder.bind(this)} filter={this.state.filter} messages = {this.getMessages.bind(this)}  updateFolders = {this.update} folders = {this.state.folders}></FoldersSidebar>             

                
                
            </div>
        )
    }

    deleteFolderBtn={
        float: 'right',
        margin: '5px',
    }

    folderNameHeader = {
        fontWeight: '600',
        display: 'inline-block',
        float :'left',
        margin: '0',
        marginTop: '4px',
        marginLeft: '30px',
        fontSize: '23px'
    }

    folderBar = {
        height: '40px',
        width: '100%',
    }

    childFolder = {
        float: 'left',
        margin: '20px',
        
        listStyle: 'none'
    }

    list = { 
        height: '600px',
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
