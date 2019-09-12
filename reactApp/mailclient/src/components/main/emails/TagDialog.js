import React, { Component, Fragment } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import axios from 'axios';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import ForwardIcon from '@material-ui/icons/Forward';
import LabelIcon from '@material-ui/icons/Label';
import NewTag from './NewTag'

export class TagDialog extends Component {

    state={
        open: false,
        tags:[],
        components: [],
        folderName: ''
  
    }

    handleOpen = () => {
        
      
        this.setState({
            open: !this.state.open
        }) ;

        var token = localStorage.getItem('token');
        
        axios({
          method: 'GET',
          url: 'http://localhost:8080/tag/getAccounts',
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

    handleClose = () =>{
        this.setState({
            open: false
        })
        this.props.closeMenu()
    }

    setTag = (tagIdVal) =>{
        var token = localStorage.getItem('token');
        
        axios({
          method: 'POST',
          url: 'http://localhost:8080/mail/setTag',
          params: {
              tagId : tagIdVal,
              messageId: this.props.messageId

          },
          headers: {
            Authorization: 'Bearer ' + token
          }
        }).then((response) => {
            this.setState({
                open: false
            })
            this.props.closeMenu()
           
          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {
            // always executed
          }); 
    }

    renderList = () =>{
        this.state.components = []

        for(let i = 0; i < this.state.tags.length; i++){
           
            this.state.components.push(
                <ListItem 
                    button
                    onClick = {() =>{
                        this.setTag(this.state.tags[i].id)
                    }

                    }
                    key={i}
                >
                    <ListItemAvatar>
                        <Avatar style={{background: '#fff', fontSize: '20px'}} >
                            <i style = {{color: '#616161',fontSize: '20px' }} class="fas fa-tag"></i>
                        </Avatar>
                    </ListItemAvatar>
                    <p>{this.state.tags[i].name}</p>
                </ListItem>
            );
        }

        return this.state.components;
    }

    render() {
        return (
            <Fragment>

            <MenuItem 
            onClick={this.handleOpen}>
               <i style = {{color: '#616161',fontSize: '18px', marginRight: '13px'}} class="fas fa-tags"></i>
                        Add a tag
            </MenuItem>

           
            <Dialog 
             PaperProps = {{
                style: {
                    borderRadius: '20px'
                  },
            }}
            fullWidth={true}
            maxWidth = {'sm'}
            onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.state.open}>
                <DialogTitle style={{margin: 'auto'}} id="simple-dialog-title">Tags</DialogTitle>
                <Divider></Divider>
                <List style={{fontSize: '20px', fontWeight: '500', color: '#616161'}}>
                   {this.renderList()}
                   {/* <NewTag></NewTag> */}
                   
                </List>
                </Dialog>              
            
        </Fragment>
        )
    }
}

export default TagDialog
