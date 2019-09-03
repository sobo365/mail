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
import ForwardIcon from '@material-ui/icons/Forward';

export class MoveDialog extends Component {

    state={
        open: false,
        folders:[],
        components: [],
        folderName: ''
  
    }

 

    

    handleOpen = () => {
        this.props.closeDialog();
        this.props.closeMenu();
        this.setState({
            open: !this.state.open
        }) ;

        var token = localStorage.getItem('token');
        
        axios({
          method: 'GET',
          url: 'http://localhost:8080/folders',
          params: {
              id: localStorage.getItem('user_id')
          },
          headers: {
            Authorization: 'Bearer ' + token
          }
        }).then((response) => {
            this.setState({
                folders: response.data
            }) ;
           
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
    }

    handleSubmit = (folderId) => {
        var token = localStorage.getItem('token');
        axios({
            method: 'post',
            url: 'http://localhost:8080/mail/update',
            params: {
                messageId: this.props.message.id,
                folderId: folderId
                
            },
            headers: {
              Authorization: 'Bearer ' + token
            }
          }).then((response) => {
              this.handleClose();
              this.props.update();
             
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
        
        for(let i = 0; i < this.state.folders.length; i++){
            this.state.components.push(
            <ListItem button 
                      onClick={() => {
                          this.state.folderName=this.state.folders[i].name;
                          this.handleSubmit(this.state.folders[i].id, this.state.folders[i].name);
                      }}
                      key={i}>
                <ListItemAvatar>
                                <Avatar style={{background: '#fff', fontSize: '20px'}} >
                                <i style = {{color: '#616161',fontSize: '20px' }} class="far fa-folder"></i>
                            </Avatar>
                            </ListItemAvatar>
                <p>{this.state.folders[i].name}</p>
            </ListItem>)
        }
        return this.state.components;
    }

    render() {
        return (
            <Fragment>

                <MenuItem 
                onClick={this.handleOpen}>
                   <ForwardIcon fontSize="medium" style={{color:'#616161', marginRight: '13px'}}/>
                            Move to
                </MenuItem>

               
                <Dialog 
                fullWidth={true}
                maxWidth = {'sm'}
                onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.state.open}>
                    <DialogTitle id="simple-dialog-title">Move to</DialogTitle>
                    <List style={{fontSize: '20px', fontWeight: '500', color: '#616161'}}>
                        {this.renderList()}
                    </List>
                    </Dialog>              
                
            </Fragment>
        )
    }

    

}

export default MoveDialog
