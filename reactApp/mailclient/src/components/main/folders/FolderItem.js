import React, { Component } from 'react'
import './style.css'

export class FolderItem extends Component {

    constructor(props){
        super(props);

        this.state = {
            folderColor: '',
            folderName: '',
            messageCount: '',
            folderIco: ''
        }
    }

    render() {
        return (
            <div className = 'folderItem'>
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
