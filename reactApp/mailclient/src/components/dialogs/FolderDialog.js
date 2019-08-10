import React, { Fragment, Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import Slide from '@material-ui/core/Slide';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import axios from 'axios'

export class FolderDialog extends Component{

    state = {
        open: false,
        folderName: '',
        errorText: '',
        errorValue : false
    }


    Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
    });


    handleChangeFolderName = event =>{
        if(event.target.value.trim() === ''){
          this.setState({
            errorValue: true,
            errorText: 'Empty field!',
            folderName: ''
          });
        }else{
          this.setState({
            errorValue: false,
            errorText: '',
            folderName: event.target.value
          });
        }
        
    }

    handleOpen = () => {
           this.setState({
               open: true,
               errorValue: false,
               errorText: '',
               folderName: ''
           }) ;
    }

    handleClose = () => {
          this.setState({
            open: false
          })
    }

    handleSubmit = () =>{
        if(this.state.folderName.trim() === ''){
            this.setState({
              errorText: 'Empty field!',
              errorValue: true,
              folderName: ''
            });
        }else{

        }
        
    }

    render(){
        
        const{open} = this.state

        
     
        return(
        
        <Fragment>
            <Tooltip 
            style = {this.ttip}
            title="Add Folder">
                <Fab  
                onClick={this.handleOpen}
                style={this.fab}
                color="secondary" 
                aria-label="add" 
                size = 'large'>
                  <AddIcon />
                </Fab>
            </Tooltip>

            <Dialog 
                style = {this.dialogStyle}
                open={open} 
                TransitionComponent={this.Transition}
                fullWidth={true}
                maxWidth = {'md'}
                aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">New Folder</DialogTitle>
            <DialogContent>

  

              <TextField
                onChange={this.handleChangeFolderName}
                value={this.state.username} 
                label="Folder Name"
                style={this.form}
                margin="normal"
                variant="outlined"
                error = {this.state.errorValue}
                helperText={this.state.errorText}
              />

            </DialogContent>
            <DialogActions>

            <Button 
                variant="contained"
                color="secondary" 
                onClick={this.handleClose}
                size="large"
                style = {this.btn} >
                Cancel
              </Button>

            <Button 
                variant="contained" 
                color="primary" 
                size="large"
                onClick={this.handleSubmit}
                style = {this.btn}>
                Save
              </Button>

            </DialogActions>
          </Dialog>
        </Fragment>
        )
        
    }

    ttip = {
        fontSize: '100px'
    }


    btn = {
      width: '110px',
      marginRight: '22px',
      marginBottom: '5px',
    }

    fabIcon = {
        
        fontSize: '30px'
    }


    form = {
      width: '100%'
    }

    fab = {
       bottom : '0',
       right: '0',
       margin : '50px',
       position: 'fixed',
       zIndex: '10'
    }
} 
    
export default FolderDialog