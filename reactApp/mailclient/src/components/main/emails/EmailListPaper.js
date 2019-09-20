import React, { Component } from 'react';
import List from '@material-ui/core/List';
import Message from '../../dialogs/Message';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';
import './email.css'
import SortIcon from '@material-ui/icons/Sort';
import { AlertErrorOutline } from 'material-ui/svg-icons';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';


export class EmailListPaper extends Component {


    constructor(props){
        super(props);

        this.state = {
            components: [],
            messages: [],
            tagFilteredMessages: new Set(),
            activeTags: new Set(),
            filterMessagesArray: [],
            tags: [],
            br : 1,
            searchField: false,
            height: '100%',
            sortMenu: false,
            filterMenu: false,

            sortAnchorEl: '',
            filterAnchorEl: '',

            sortFromStateAsc: false,
            sortSubjectStateAsc: false,
            sortDateStateAsc: false,
            
        }
    }

    
    

    componentWillReceiveProps(){
        document.getElementById("progress").style.display = "none";
        this.state.br++;  
        
        var token = localStorage.getItem('token');
        
        axios({
          method: 'GET',
          url: 'http://localhost:8080/tag/getTags',
          params: {
              id: localStorage.getItem('user_id')
          },
          headers: {
            Authorization: 'Bearer ' + token
          }
        }).then((response) => {
            this.setState({
                tags: response.data
            }) ;
            console.log(response.data)
          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {
            // always executed
          }); 
    }

    componentDidMount = () =>{
        
        var height = window.innerHeight - 300;
        var heightS = height + 'px';
        this.setState({
            br: 0,
            height: heightS
        }); 
    }

    


    renderList = () =>{
        this.state.components = []
        
        for(let i = 0; i < this.props.messages.length; i++){
            let message = this.props.messages[i];
            if(message.canDisplay){
                this.state.components.push(<Message key={i} position = {i} retMessage={this.props.retMessage} message={message} update={this.props.update} menuAvailable={this.props.menuAvailable}></Message>)
            }
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

    openSortMenu = (e) =>{
        this.setState({
            sortMenu: true,
            sortAnchorEl: e.currentTarget 
        })
    }

    closeSortMenu = e =>{
        this.setState({
       
            sortMenu: false,
            sortAnchorEl: null,
        })
    }

    openFilterMenu = e =>{
        this.setState({
            filterMenu: true,
            filterAnchorEl: e.currentTarget
        })
    }

    closeFilterMenu = () =>{
        this.setState({
            filterAnchorEl: null, 
            filterMenu: false
        })
    }

    handleSortFrom = () =>{
        if(!this.state.sortFromStateAsc){
            this.props.messages.sort((a,b) => (a.from > b.from) ? 1 : -1);
        }else{
            this.props.messages.sort((a,b) => (b.from > a.from) ? 1 : -1);
        }
        this.state.sortFromStateAsc = !this.state.sortFromStateAsc;
        this.forceUpdate();
    }

    handleSortSubject = () =>{
        if(!this.state.sortSubjectStateAsc){
            this.props.messages.sort((a,b) => (a.subject > b.subject) ? 1 : -1)
        }else{
            this.props.messages.sort((a,b) => (b.subject > a.subject) ? 1 : -1)
        }
        this.state.sortSubjectStateAsc = !this.state.sortSubjectStateAsc;
        this.forceUpdate();
    }

    handleSortDate = () =>{
        this.closeSortMenu();
        if(!this.state.sortDateStateAsc){
            this.props.messages.sort((a, b) => (a.dateTime > b.dateTime) ? 1 : -1)
        }else{
            this.props.messages.sort((a, b) => (b.dateTime > a.dateTime) ? 1 : -1)
        }
        this.state.sortDateStateAsc = !this.state.sortDateStateAsc;
        this.forceUpdate();
    }

    renderTagList = () =>{
        let components = []
        
        for(let i = 0; i < this.state.tags.length; i++){
            let checkedValue = false;
            if(this.state.activeTags.has(this.state.tags[i].name)){
                checkedValue = true;
            }
            components.push(
                <div style = {{ marginLeft: '20px', width: '90%'}}>
                    <FormControlLabel
                        control={
                        <Checkbox checked={checkedValue} onChange={() =>{this.handleTagFilter(this.state.tags[i].name)}} />
                        }
                        label={this.state.tags[i].name}
                    />
                </div>

                
            )
        }

        return components;
    }
    
    handleTagFilter = (tagname) =>{
        
        if(this.state.activeTags.has(tagname)){
            this.state.activeTags.delete(tagname);
        }else{
            this.state.activeTags.add(tagname);
        }
        
        if(this.state.activeTags.size > 0){
            for(let i = 0; i < this.props.messages.length; i++){
                for(let j = 0; j < this.props.messages[i].tags.length; j++){
                    if(this.state.activeTags.has(this.props.messages[i].tags[j].name)){
                       this.props.messages[i].canDisplay = true;                       
                    }else{
                        this.props.messages[i].canDisplay = false;
                    }
                }
            }
        }else{
            for(let i = 0; i < this.props.messages.length; i++){
                this.props.messages[i].canDisplay = true;
            }
        }
        
        this.forceUpdate();

        console.log(this.state.tagFilteredMessages)
    }

    render() {
        return (
            
            <div style={this.content}>
            <LinearProgress id = 'progress'></LinearProgress>


            <div style={{width: '100%', borderBottom: '1px solid #EEEEEE'}}>

            <div onClick={this.openSortMenu} style={{display: 'inline-block', width: '3%', float: 'left'}}>
                <IconButton style={this.sortIco} >
                    <SortIcon fontSize="large" />
                </IconButton>
                     <Menu
                            onClose={this.closeSortMenu}
                            open={this.state.sortMenu}
                            anchorEl={this.state.sortAnchorEl}
                            PaperProps = {{
                                style: {
                                    borderRadius: '20px',
                                   
                                  },
                            }}
                            style={{ marginLeft: this.state.xPosition + 100 }}      
                                   
                        >
                            <p style={{textAlign: 'center', fontWeight: '500'}} >Sort By</p>
                            <Divider/>
                            <MenuItem onClick={this.handleSortFrom}>From</MenuItem>
                            <MenuItem onClick={this.handleSortSubject}>Subject</MenuItem>
                            <MenuItem onClick={this.handleSortDate}>Date</MenuItem>
                            

                        </Menu>
                </div>

                <div onClick={this.openFilterMenu} style={{display: 'inline-block', width: '3%', float: 'left'}}>
                <IconButton style={this.filterIco} >
                    <FilterListIcon fontSize="large" />
                </IconButton> 
                     <Menu
                            onClose={this.closeFilterMenu}
                            open={this.state.filterMenu}
                            anchorEl={this.state.filterAnchorEl}
                            PaperProps = {{
                                style: {
                                    borderRadius: '20px'
                                  },
                            }}
                            style={{ marginLeft: this.state.xPosition }}      
                                   
                        >
                            <p style={{textAlign: 'center', fontWeight: '500'}} >Filter tags</p>
                            <Divider/>
                            
                            {this.renderTagList()}

                        </Menu>
                </div>
                

                <InputBase
                            placeholder="Search Messages"
                            onChange={this.handleSearchFilter}
                            onFocus={this.handleFocus}
                            style={this.searchField}
                    
                        />
          
                
            </div>
            <div>
            <List style={{overflowY: 'auto', height: this.state.height}} component="nav" aria-label="main mailbox folders">
                {this.renderList()}          

            </List>
            </div>
            
            
            </div>  
        )
    }

    searchField = {
        
        height: '60px'
    }

    sortIco = {
        float: 'left'
    }

    filterIco = {
        float: 'left',
        marginLeft: '20px'
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
