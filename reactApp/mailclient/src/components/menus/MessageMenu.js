import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

export class MessageMenu extends Component {


  

    render() {
        return (
            <PopupState variant="popover" popupId="demo-popup-menu">
            {popupState => (
              <React.Fragment>
                <Button 
                        style={{display: 'inline-block'}}
                        variant="contained" 
                        onClick={popupState.open}
                        onContextMenu={popupState.open}
                        >
                  Open Menu
                </Button>
                <Menu
                    open={true}
                {...bindMenu(popupState)}>
                  <MenuItem onClick={popupState.close}>Cake</MenuItem>
                  <MenuItem onClick={popupState.close}>Death</MenuItem>
                </Menu>
              </React.Fragment>
            )}
          </PopupState>
        )
    }
}

export default MessageMenu
