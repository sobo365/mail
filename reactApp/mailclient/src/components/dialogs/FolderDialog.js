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

export class FolderDialog extends Component{

    state = {
        open: false,
        folderName: ''
    }

    Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
    });


    handleChangeFolderName = event =>{
        this.setState({
            folderName: event.target.value
        });
    }

    handleToggle = () => {
           this.setState({
               open: !this.state.open
           }) 
    }

    handleSubmit = () =>{
        if(this.state.folderName.trim() != ''){
            alert(this.state.folderName)
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
                onClick={this.handleToggle}
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
                error={this.state.folderName.trim() === ""}
                helperText={this.state.folderName.trim() === "" ? 'Empty field!' : ' '}
              />

            </DialogContent>
            <DialogActions>

            <Button 
                variant="contained"
                color="secondary" 
                onClick={this.handleToggle}
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