import React, { Component } from 'react'

export class Rule extends Component {
    render() {
        return (
            <Fragment>
            
            <div>
                <p>Rules</p>
            </div>

            <Dialog 
             PaperProps = {{
              style: {
                  borderRadius: '20px'
                },
          }}
                style = {this.dialogStyle}
                open={open} 
                TransitionComponent={this.Transition}
                fullWidth={true}
                maxWidth = {'md'}
                aria-labelledby="form-dialog-title">
            <DialogTitle style = {{color: '#1A237E'}} id="form-dialog-title">Update Account
            
            
            <Button 
               
                color="primary" 
                size="large"
                onClick={this.handleSubmit}
                style = {this.btn}>
                Save
              </Button>

            <Button 
               
                color="secondary" 
                size="large"
                onClick={this.handleToggle}
                style = {this.btn}>
                Cancel
              </Button>

                        
            </DialogTitle>
            <DialogContent style={{padding: '30px'}}>

            </DialogContent>
            <DialogActions>

            

            </DialogActions>
          </Dialog>
        </Fragment>
        )
    }
}

export default Rule
