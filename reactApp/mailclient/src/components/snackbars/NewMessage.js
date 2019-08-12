import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SnackbarContent from '@material-ui/core/SnackbarContent';

export class NewMessage extends Component {
    state = {
        open: false,
        message: ''
    }


 

    handleToggle = () => {
        this.setState({
            open: !this.state.open
        }) ;
    }

    render() {
        
        return (
            <div>
            <Snackbar
            
          
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={this.props.open}
              autoHideDuration={6000}
              onClose={this.handleToggle}
              ContentProps={{
                'aria-describedby': 'message-id',
              }}
             
            
            > 
                <SnackbarContent style={this.snack} message={<span id="message-id">{this.props.message}</span>}>
                    
                </SnackbarContent>
            </Snackbar>
          </div>
        )
    }

    snack = {
       
        backgroundColor: 'rgba(41, 41, 41, 0.479)',
        fontSize: '16px'
    }

   
}

export default NewMessage
