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

export class Compose extends Component{

    state = {
        open: false
    }

    Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
    });

    handleToggle = () => {
           this.setState({
               open: !this.state.open
           }) 
    }

    render(){
        
        const{open} = this.state

        
     
        return(
        
        <Fragment>

<Tooltip 
            style = {this.ttip}
            title="Compose Email">
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
            <DialogTitle id="form-dialog-title">New Message</DialogTitle>
            <DialogContent>

              <TextField
                label="To"
                style={this.form}
                margin="normal"
              />

              <TextField
                label="Subject"
                style={this.form}
                multiline
                rowsMax="100"   
                margin="normal"

                />

              <TextField
                label="Content"
                style={this.form}
                multiline
                rowsMax="100"   
                margin="normal"

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
                style = {this.btn}>
                Send
              </Button>

            </DialogActions>
          </Dialog>
        </Fragment>
        )
        
    }



    btn = {
      width: '110px',
      marginRight: '22px',
      marginBottom: '5px',
    }

    fabIcon = {
        marginRight: '10px',
        fontSize: '30px'
    }


    form = {
      width: '100%'
    }

    fab = {
      zIndex: '10',
      bottom : '0',
      right: '0',   
      margin : '50px',
      position: 'fixed',
    
  }
} 
    
export default Compose