import React, { Component, Fragment } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import axios from 'axios'

export class AccountSelectDialog extends Component {

    state={
        open: false,
        accounts:[],
        components: [],
        email: ''
  
    }

    

    handleToggle = () => {
        this.setState({
            open: !this.state.open
        }) ;

        var token = localStorage.getItem('token');
        
        axios({
          method: 'get',
          url: 'http://localhost:8080/account/getAccounts',
          params: {
              id: localStorage.getItem('user_id')
          },
          headers: {
            Authorization: 'Bearer ' + token
          }
        }).then((response) => {
            this.setState({
                accounts: response.data
            }) ;
           
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
        for(let i = 0; i < this.state.accounts.length; i++){
            this.state.components.push(
            <ListItem button 
                      onClick={() => {
                          this.state.email=this.state.accounts[i].displayname
                          localStorage.setItem('email', this.state.accounts[i].displayname)
                          this.handleToggle()
                      }}
                      key={i}>
                <ListItemAvatar>
                                <Avatar >
                                <i class="far fa-user"></i>
                            </Avatar>
                            </ListItemAvatar>
                <p>{this.state.accounts[i].displayname}</p>
            </ListItem>)
        }
        console.log(this.state.accounts)
        return this.state.components;
    }

    render() {
        const{open} = this.state
        return (
            <Fragment>
                <Chip
                    avatar={<Avatar style={this.avatarStyle}>{localStorage.getItem('email') ? localStorage.getItem('email')[0].toUpperCase() : '' }</Avatar>}
                    style={this.chipStyle}
                    label={localStorage.getItem('email')}
                    onClick={this.handleToggle}
                    
                />
                <Dialog onClose={this.handleToggle} aria-labelledby="simple-dialog-title" open={open}>
                    <DialogTitle id="simple-dialog-title">Select Account</DialogTitle>
                    <List>
                        
                        {/* <ListItem button >
                            <ListItemAvatar>
                            <Avatar className={classes.avatar}>
                                <PersonIcon />
                            </Avatar>
                            </ListItemAvatar>
                            
                        </ListItem>
                        

                        <ListItem button >
                        <ListItemAvatar>
                            <Avatar>
                            <AddIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="add account" />
                        </ListItem> */}

                        {this.renderList()}
                    </List>
                    </Dialog>              
                
            </Fragment>
        )
    }

    avatarStyle = {
       
        color:'#2CA8FF',
        background: '#fff', 
    
        
    }

    chipStyle={
        textAlign:'justify',
        height: '50px',
        width: '95%',
        background: 'rgba(250, 250, 250, 0.25)',
        color: '#fff',
        fontWeight: '300',
        fontSize: '17px',
        margin: '10px',
        marginLeft:'5px',
    }

   
}

export default AccountSelectDialog
