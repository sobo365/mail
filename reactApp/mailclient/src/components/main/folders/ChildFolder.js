import React, { Component } from 'react'

export class ChildFolder extends Component {
    render() {
        return (
            <div style = {this.folder}>
                <i style = {this.folderIco} class="far fa-folder"></i>
                <p style = {this.folderText}>Folder</p>
            </div>
        )
    }

    folderText = {
        fontSize: '22px',
        fontWeight: '500',
        color: '#BDBDBD',
        margin: '0',
        display: 'inline-block'
    }

    folderIco = {
        fontSize: '25px',
        color: '#BDBDBD',
        margin: '0',
        display: 'inline-block',
        marginRight: '10px'
    }

    folder = {
        float: 'left',
        width: '100px',
        paddingLeft: '10px',
        paddingRight: '10px',
        height: '45x',
        borderRadius: '10px',
        border: '3px solid #BDBDBD'
    }
}

export default ChildFolder
