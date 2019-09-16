import React, { Component } from 'react';
import AttachmentIcon from '@material-ui/icons/Attachment';
import CloseIcon from '@material-ui/icons/Close';

export class AttachmentItem extends Component {
    
    handleRemove = () =>{
        this.props.removeItem(this.props.id);
    }

  
    
    render() {
        return (
            <div style={{margin: '5px'}}>
                <i style={this.attIcon} class="fas fa-paperclip"></i>
                <p style={this.attachmentTitle}>{this.props.file.name}</p>
                <div style= {{display: 'inline-block'}} onClick={this.handleRemove}>
                 <i style = {this.removeIco} class="fas fa-times"></i>
                </div>
                
            </div>
        )
    }

    attachmentTitle = {
        display : 'inline-block',
        margin: 0,
        fontSize: '18px',
        fontWeight: '500',
        color: '#424242'
    }

    attIcon = {
        fontSize: '22px',
        marginRight: '12px',
        color: '#424242'
    }

    removeIco = {
        fontSize: '22px',
        marginLeft: '9px',
        color: '#F44336'
    }
}

export default AttachmentItem
