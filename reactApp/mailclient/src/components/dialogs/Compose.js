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
import './Dialogs.css'

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

{/* <Tooltip 
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
            </Tooltip> */}

            <div id = 'composeBtn'
            onClick={this.handleToggle}>
            <i id = 'composeBtnIco' class="fas fa-feather-alt"></i>
            <p id = 'composeText'>Compose</p>
            </div>
    
            <Dialog 
                style = {this.dialogStyle}
                open={open} 
                TransitionComponent={this.Transition}
                fullWidth={true}
                maxWidth = {'md'}
                aria-labelledby="form-dialog-title">
            <DialogTitle style = {{color: '#1A237E'}} id="form-dialog-title">Compose Message
            
            <Button 
               
                color="secondary" 
                size="large"
                onClick={this.handleToggle}
                style = {this.btn}>
                Cancel
              </Button>
            </DialogTitle>
            <DialogContent>

              <TextField
                label="To"
                style={this.form}
                margin="normal"
                variant='outlined'
              />

              <TextField
                label="Subject"
                style={this.form}
                multiline
                rowsMax="100"   
                margin="normal"
                variant='outlined'

                />

              <TextField
                label="Content"
                style={this.form}
                multiline
                rowsMax="100"   
                margin="normal"
                variant='outlined'

                />

            </DialogContent>
            <DialogActions>

          <div id = 'composeSendBtn'>
            <p id = 'composeSendText'>Send</p>
            <i id = 'composeSendIco' class="fas fa-chevron-right"></i>
          </div>

           

            </DialogActions>
          </Dialog>
        </Fragment>
        )
        
    }

  
    btn = {
      fontSize: '20px',
      fontWeight: '500',
      width: '110px',
      float: 'right',
      marginRight: '10px',
      marginTop: '0px',
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