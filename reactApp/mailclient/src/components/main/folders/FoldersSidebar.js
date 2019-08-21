import React, { Component } from 'react'
import FolderItem from './FolderItem'
import AddFolder from '../../dialogs/FolderDialog'

export class FoldersSidebar extends Component {
    render() {
        return (
            <div style={this.sidebar}>
                <p style={this.header}>Folders</p>
                <ul style = {this.listItem}>
                    <li><FolderItem folderName='Inbox' messageCount= '2' folderColor='#6f32ff' folderIco='fas fa-inbox'></FolderItem></li>     
                    <li><FolderItem folderName='Outbox' messageCount= '5' folderColor='#40ca7b' folderIco='fas fa-angle-double-up'></FolderItem></li>     
                    <li><FolderItem folderName='Drafts' messageCount= '4' folderColor='#ffcd41' folderIco='fas fa-file'></FolderItem></li>     
                    <li><FolderItem folderName='Spam' messageCount= '7' folderColor='#ff9066' folderIco='fas fa-exclamation-circle'></FolderItem></li> 
                    <li><AddFolder></AddFolder></li>   
                </ul>
                
            </div>
        )
    }

    header = {
        color: '#9b97b1',
        fontWeight: '600',
        fontSize: '20px',
        float: 'left',
        marginLeft: '30px'
    }

    sidebar = {
        fontSize: '25px',
        color: '#fff',
        position: 'fixed',
        top: '0',
        right: '0',
        background: '#EEEEEE',
        height: '100%',
        width: '25%',
        overflow : 'auto'
        
    }

    listItem = {
        padding: '0',
        listStyle: 'none',
        overflow : 'auto',
        display: 'inline',
        
        
    }
}

export default FoldersSidebar
