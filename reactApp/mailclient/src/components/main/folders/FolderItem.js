import React, { Component } from 'react'
import './style.css'
import axios from 'axios'

export class FolderItem extends Component {

    constructor(props){
        super(props);

        this.state = {
            folderColor: '',
            folderName: '',
            messageCount: '',
            folderIco: '',
            active: this.props.active  ,
            filter : ''
              
        }
    }

    
       

    componentDidMount = () =>{
        if(this.props.folderName === 'Inbox'){
            var token = localStorage.getItem('token');
                axios({
                    method: 'GET',
                    url: 'http://localhost:8080/mail/getByFolder',
                    headers: {
                        Authorization: 'Bearer ' + token
                    },
                    params: {
                        accountId : localStorage.getItem('account_id'),
                        folderId: this.props.id,
                        filter: this.props.filter
                    }
                }).then((response) => {
                    console.log(response.data)
                    this.props.messages(response.data);
                    this.props.currentFolder(this.props.id);
                })
        }
    }

   

    handleClick = () =>{
        this.props.update();
        this.props.currentFolder(this.props.id);
        var token = localStorage.getItem('token');
        axios({
            method: 'GET',
            url: 'http://localhost:8080/mail/getByFolder',
            headers: {
                Authorization: 'Bearer ' + token
            },
            params: {
                accountId : localStorage.getItem('account_id'),
                folderId: this.props.id,
                filter: ''
            }
        }).then((response) => {
            console.log(response.data)
            this.props.messages(response.data)
        })

        this.setState({
            active: true
        })

        
    }

    render() {
        return (
            <div className = {this.state.active ? 'folderItemActive' : 'folderItem'}
                 onClick = {this.handleClick}>
                <div id = 'folderItemIcoBackground' style={{background: this.props.folderColor}}>
                    <i id = 'folderItemIco' class={this.props.folderIco}></i>
                </div>
                <div className = 'folderItemText'>
                    <p className= 'folderItemPrimaryText' >{this.props.folderName}</p>
                    <p className= 'folderItemSecondaryText' >{this.props.messageCount} messages</p>
                </div>
                
            </div>
        )
    }


}

export default FolderItem
