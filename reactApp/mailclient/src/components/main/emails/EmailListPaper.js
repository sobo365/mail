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
     
        if(this.state.components.length > 0){
            return this.state.components;
        }else{
            return (<div><p style={this.message}>Empty folder!</p></div>)
        }
        
        
    }






    render() {
        return (
            <div style={this.content}>
              <LinearProgress id = 'proggress'></LinearProgress>
            <List style={{overflowY: 'hidden'}} component="nav" aria-label="main mailbox folders">
                {this.renderList()}          

            </List>
            
            </div>  
        )
    }

    content = {
       // overflowY: 'auto',  
        width: '92%',
        float: 'right',
        marginBottom: '120px'
    }

    message = {
        color: '#1A237E',
        marginTop: '200px',
        fontSize: '45px',
        fontWeight: '600'
    }
}

export default EmailListPaper
