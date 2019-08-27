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
                        folderId: this.props.id
                    }
                }).then((response) => {
                    console.log(response.data)
                    this.props.messages(response.data)
                })
        }
    }

   

    handleClick = () =>{
        var token = localStorage.getItem('token');
        axios({
            method: 'GET',
            url: 'http://localhost:8080/mail/getByFolder',
            headers: {
                Authorization: 'Bearer ' + token
            },
            params: {
                accountId : localStorage.getItem('account_id'),
                folderId: this.props.id
            }
        }).then((response) => {
            console.log(response.data)
            this.props.messages(response.data)
        })
    }

    render() {
        return (
            <div className = 'folderItem'
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
