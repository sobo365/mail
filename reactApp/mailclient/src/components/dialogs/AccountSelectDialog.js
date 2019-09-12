import React, { Component, Fragment } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import axios from 'axios'
import Divider from '@material-ui/core/Divider';

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
                          this.state.email=this.state.accounts[i].displayname;
                          localStorage.setItem('email', this.state.accounts[i].displayname);
                          localStorage.setItem('account_id', this.state.accounts[i].id);
                          this.handleToggle();
                          window.location.reload();
                      }}
                      key={i}>
                <ListItemAvatar>
                                <Avatar style={{background: 'linear-gradient(45deg, rgba(255,159,16,1) 30%, rgba(255,208,16,1) 90%)'}} >
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

                <div 
                onClick={this.handleToggle}
                style={this.accountStyle}>
                    <p style={this.accountLetter}>
                        {localStorage.getItem('email') ? localStorage.getItem('email')[0] : ''}
                    </p>
                </div>

                {/* <Chip
                    
                    style={this.chipStyle}
                    label={localStorage.getItem('email') ? localStorage.getItem('email'): 'Select Account'}
                    onClick={this.handleToggle}
                    
                /> */}
                <Dialog 
                    onClose={this.handleToggle} 
                    PaperProps = {{
                        style: {
                            borderRadius: '20px'
                          },
                    }}
                    maxWidth={'sm'}
                    fullWidth={true}
                    aria-labelledby="simple-dialog-title" 
                    open={open}>
                    <DialogTitle style={{margin:'auto'}} id="simple-dialog-title">Select Account</DialogTitle>
                    <Divider></Divider>
                    <List>
                        {this.renderList()}
                    </List>
                    </Dialog>              
                
            </Fragment>
        )
    }

    accountLetter = {
        paddingTop: '8px',
        marginLeft: '22px',
        fontWeight: '900',
        fontSize: '30px',
        color: 'rgba(255,159,16,1)',
        cursor: 'default'
    }    

    accountStyle = {
        margin: '17px',
        height: '60px',
        width: '60px',
        background: '#fff',
        borderRadius: '18px',   
        boxShadow: '0px 3px 7px 0px rgba(0,0,0,0.2)'

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
