import React, { Component } from 'react';
import List from '@material-ui/core/List';
import Message from '../../dialogs/Message';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './email.css'
import { AlertErrorOutline } from 'material-ui/svg-icons';

export class EmailListPaper extends Component {

    constructor(props){
        super(props);

        this.state = {
            components: [],
            messages: [],
            br : 1,
            searchField: false
        }
    }

    component
    

    componentWillReceiveProps(){
        document.getElementById("progress").style.display = "none";
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
            this.state.components.push(<Message key={i} position = {i} retMessage={this.props.retMessage} message={message} update={this.props.update} menuAvailable={this.props.menuAvailable}></Message>)
        }
     
        if(this.state.components.length <= 0 && this.state.br > 1){
            return (<div><p style={this.message}>No Messages!</p></div>)
        }else{
            
              
            return this.state.components;
        }
        
        
    }


    handleSearchFilter = event =>{
        this.props.filter(event.target.value);
        if(event.target.value == ''){
            this.setState({
                searchField: false
            })
        }else{
            this.setState({
                searchField: true
            })
        }
        
        
    }

    render() {
        return (
            
            <div style={this.content}>
            <LinearProgress id = 'progress'></LinearProgress>
            <div id = {this.props.searchBox ? 'searchBoxAvailable' : 'noSearchBox'}>
                <div id = {this.state.searchField ? 'fullWidthSearchBox' : 'searchBox'}>
                <i id = 'searchIco' class="fas fa-search"></i>
                <TextField
                    id="searchInput"
                    placeholder="Search"
                    onChange={this.handleSearchFilter}
                    onFocus={this.handleFocus}
                    autoComplete='off'
                /> 
                </div>
            </div>
            
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
