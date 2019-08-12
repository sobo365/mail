import React, { Component } from 'react';
import List from '@material-ui/core/List';
import Message from '../../dialogs/Message';
import LinearProgress from '@material-ui/core/LinearProgress';

export class EmailListPaper extends Component {

    constructor(props){
        super(props);

        this.state = {
            components: [],
            messages: []
        }
    }


    componentWillReceiveProps(){
        document.getElementById("proggress").style.display = "none";
    }


    renderList = () =>{
        this.state.components = []
        
        for(let i = 0; i < this.props.messages.length; i++){
            let message = this.props.messages[i];
            this.state.components.push(<Message key={i} unread={message.unread} id = {message.id} content={message.content} subject={message.subject} from={message.from} dateTime={message.dateTime}></Message>)
        }
     
        
        return this.state.components;
    }




    render() {
        return (
            <div style={this.content}>
              <LinearProgress id = 'proggress'></LinearProgress>
            <List component="nav" aria-label="main mailbox folders">
                {this.renderList()}          

            </List>
            
            </div>  
        )
    }

    content = {
        overflowY: 'auto',  
        width: '92%',
        float: 'right',
        marginBottom: '120px'
    }
}

export default EmailListPaper
