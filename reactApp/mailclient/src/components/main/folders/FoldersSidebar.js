import React, { Component } from 'react'
import FolderItem from './FolderItem'
import AddFolder from '../../dialogs/FolderDialog'

export class FoldersSidebar extends Component {

    constructor(props){
        super(props);

   
        this.state = {
            components: [],
            folders: [],
            inbox:{name: 'Inbox', color: '#6f32ff', ico:'fas fa-inbox'},
            outbox:{name: 'Outbox', color: '#40ca7b', ico:'fas fa-angle-double-up'},
            spam:{name: 'Spam', color: '#ff9066', ico:'fas fa-exclamation-circle'},
            drafts:{name: 'Drafts', color: '#ffcd41', ico:'fas fa-file'},
            custom:{name: 'Folder', color: '#9E9E9E', ico:'far fa-folder'},
            messages: []
        }
    }

    

    renderList = () => {
        this.state.components = [];
        
        for(let i = 0; i < this.props.folders.length; i++){
            let folder = this.props.folders[i];
            if(folder.name.toLowerCase() === 'inbox'){
                this.state.components.push( <li><FolderItem  key={i} folderName={this.state.inbox.name} messageCount= {folder.messageCount} folderColor={this.state.inbox.color} folderIco={this.state.inbox.ico} id = {folder.id} messages={this.props.messages.bind(this)} update={this.update} active filter={this.props.filter} ></FolderItem></li>)

            }else if(folder.name.toLowerCase() === 'outbox'){
                this.state.components.push( <li><FolderItem key={i} folderName={this.state.outbox.name} messageCount= {folder.messageCount}  folderColor={this.state.outbox.color} folderIco={this.state.outbox.ico} id={folder.id} messages={this.props.messages.bind(this)} update={this.update} filter={this.props.filter}></FolderItem></li>)

            }else if(folder.name.toLowerCase() === 'spam'){
                this.state.components.push( <li><FolderItem  key={i} folderName={this.state.spam.name} messageCount={folder.messageCount}  folderColor={this.state.spam.color} folderIco={this.state.spam.ico} id = {folder.id} messages={this.props.messages.bind(this)} update={this.update} filter={this.props.filter}></FolderItem></li>)

            }else if(folder.name.toLowerCase() === 'drafts'){
                this.state.components.push( <li><FolderItem key={i} folderName={this.state.drafts.name} messageCount= {folder.messageCount}  folderColor={this.state.drafts.color} folderIco={this.state.drafts.ico} id = {folder.id} messages={this.props.messages.bind(this)} update={this.update} filter={this.props.filter}></FolderItem></li>)

            }else{
                this.state.components.push( <li><FolderItem key={i} folderName={folder.name} messageCount= {folder.messageCount}  folderColor={this.state.custom.color} folderIco={this.state.custom.ico} id = {folder.id} messages={this.props.messages.bind(this)} update={this.update} filter={this.props.filter}></FolderItem></li>)

            }

            
            
           
        }

        return this.state.components;

    }

    update = () => {
        this.props.updateFolders();
        this.state.components = [];
        this.renderList();
    }

    render() {
        return (
            <div style={this.sidebar}>
                <p style={this.header}>Folders</p>
                <ul style = {this.listItem}>
                        
                   
                    {this.renderList()} 
                    <li><AddFolder update={this.update}></AddFolder></li>
                    <li><div style = {{height: '100px', width: '100%', display: 'inline-block'}}></div></li>
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
        overflow : 'auto',
        boxShadow: '0px -1px 15px 0px rgba(0,0,0,0.1)'
        
    }

    listItem = {
        padding: '0',
        listStyle: 'none',
        overflow : 'auto',
        display: 'inline',
        
        
    }
}

export default FoldersSidebar
