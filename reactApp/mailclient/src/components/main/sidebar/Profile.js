import React, { Component } from 'react'
import clsx from 'clsx';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Switch from '@material-ui/core/Switch';
import { capitalize } from '@material-ui/core/utils';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import DeleteIcon from '@material-ui/icons/Delete';

export class Profile extends Component {

    handleClose = () => {

    }

    handleOpen = () => {
    
    }

    render() {
        return (
            <div >
            <SpeedDial
              ariaLabel="SpeedDial example"
              
             // hidden={hidden}
              icon={<SpeedDialIcon />}
              onBlur={this.handleClose}
              onClick={this.handleClick}
              onClose={this.handleClose}
              onFocus={this.handleOpen}
              onMouseEnter={this.handleOpen}
              onMouseLeave={this.handleClose}
              open={true}
              direction='right'
            >
              
            </SpeedDial>
          </div>
        )
    }
}

export default Profile
