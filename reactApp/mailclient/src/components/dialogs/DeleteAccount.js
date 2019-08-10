import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios'

export class DeleteAccount extends Component {

    state = {
        open: false,
        acccount_id: 0
    }

   

    handleDelete = () => {
         
        var token = localStorage.getItem('token');
        axios({
            method: 'delete',
            url: 'http://localhost:8080/account/deleteAccount',
            params: {
                id: this.props.acccount_id
            },
            headers: {
              Authorization: 'Bearer ' + token
            }
          }).then((response) => {
            
            this.handleToggle();
              
            })
            .catch(function (error) {
              console.log(error);
            })
            .then(function () {
              // always executed
            }); 
    }
 

    handleToggle = () => {
        this.setState({
            open: !this.state.open
        }) ;
    }

    render() {
        const{open} = this.state
        return (
            <Fragment>
                <Button variant="outlined" color="secondary" onClick={this.handleToggle} style={{width:'50%'}}>
                    Delete
                </Button>
                <Dialog
                    open={open}
                    onClose={this.handleToggle}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle style={{margin: 'auto'}} id="alert-dialog-title">{"Alert"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want delete this account?<br/>
                        This action can't be undone.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button color="secondary" onClick={this.handleToggle}>
                        Cancel
                    </Button>
                    <Button  color="primary" autoFocus onClick={this.handleDelete} >
                        Delete
                    </Button>
                    </DialogActions>
                </Dialog>               
                
            </Fragment>
        )
    }

   
}

export default DeleteAccount
