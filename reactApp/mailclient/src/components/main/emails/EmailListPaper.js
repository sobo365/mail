import React, { Component } from 'react';
import List from '@material-ui/core/List';
import Message from '../../dialogs/Message';
import LinearProgress from '@material-ui/core/LinearProgress';

export class EmailListPaper extends Component {

    constructor(props){
        super(props);

        this.state = {
            components: [],
            messages: [],
            br : 1
        }
    }


    componentWillReceiveProps(){
        document.getElementById("proggress").style.display = "none";
        this.state.br++;    
    }

    componentDidMount = () =>{
        this.setState({
            br: 0
        }); 
    }


    renderList = () =>{
        this.state.components = []
        
        for(let i = 0; i < this.props.messages.length; i++){
            let message = this.props.messages[i];
            this.state.components.push(<Message key={i} unread={message.unread} id = {message.id} content={message.content} subject={message.subject} from={message.from} dateTime={message.dateTime}></Message>)
        }
     
        if(this.state.components.length <= 0 && this.state.br > 1){
            return (<div><p style={this.message}>No Messages!</p></div>)
        }else{
            
              
            return this.state.components;
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
        overflow: 'auto',  
        width: '100%',
        float: 'right'
    }

    message = {
        color: '#1A237E',
        marginTop: '200px',
        fontSize: '45px',
        fontWeight: '600'
    }
}

export default EmailListPaper
