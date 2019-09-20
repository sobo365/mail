import React, { Component, Fragment } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import AddBoxIcon from '@material-ui/icons/AddBox';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { positions } from '@material-ui/system';



export class Rule extends Component {

  constructor(props){
    super(props);

    this.state = {
      open : false,
      newRuleOpen: false,
      condition : 1,
      operation: 1,
      value: '',
      valueErrorState: false,
      valueErrorMessage: '',
      rules: []
    }
  }

  openDialog =  () =>{
    this.setState({
      open: true
    })

    var token = localStorage.getItem('token');

        axios({
            method: 'GET',
            url: 'http://localhost:8080/rule/folderRules',
            headers: {
                Authorization: 'Bearer ' + token
            },
            params: {
                folderId : this.props.folderId
            }
        }).then((response) => {
            this.setState({
              rules: response.data
            })
        })
  }

  newRule = () =>{
    this.setState({
      newRuleOpen: true,
      open: false
    })
  }

  closeNewRule = () =>{
    this.setState({
      newRuleOpen: false, 
      open: true
    })
  }

  changeCondition = event =>{
    this.setState({
      condition : event.target.value
    })
  }

  changeOperation = event =>{
    this.setState({
      operation : event.target.value
    })
  }

  changeValue = event =>{
    if(event.target.value.trim != ''){
      this.setState({
        value: event.target.value.trim(),
        valueErrorMessage: '',
        valueErrorState: false
      })
    }else{
      this.setState({
        value: '',
        valueErrorMessage: 'Empty value',
        valueErrorState: true
      })
    }
  }

  submitNewRule = () =>{
    var token = localStorage.getItem('token');

        axios({
            method: 'POST',
            url: 'http://localhost:8080/rule/add',
            headers: {
                Authorization: 'Bearer ' + token
            },
            params: {
                folderId : this.props.folderId,
                operation: this.state.operation,
                condition: this.state.condition,
                value : this.state.value
            }
        }).then((response) => {
            this.state.rules.push(response.data)
            this.closeNewRule();
            this.forceUpdate();
        })
  }

  removeRule = (position, id) =>{
    var token = localStorage.getItem('token');

        axios({
            method: 'DELETE',
            url: 'http://localhost:8080/rule/deleteRule',
            headers: {
                Authorization: 'Bearer ' + token
            },
            params: {
                ruleId: id
            }
        }).then((response) => {
            this.state.rules.splice(position, 1);
            this.forceUpdate();
        })
  }

  renderRules = () =>{
    let components = []

    for(let i = 0; i < this.state.rules.length; i++){
      components.push(
        
              <div style={this.ruleWrapperStyle}>
                <p style={this.ruleTextStyle}>Operation:  {this.state.rules[i].operation}</p>
                <p style={this.ruleTextStyle}>Condition:  {this.state.rules[i].condition}</p>
                <p style={this.ruleTextStyle}>Value:  {this.state.rules[i].value}</p>
                <Button variant="contained"  style={this.ruleBtn}>
                        Apply
                </Button>
                <Button variant="contained" onClick={() =>{this.removeRule(i, this.state.rules[i].id)}}  style={this.ruleBtn}>
                        Remove
                </Button>
               </div>
           
      )
    }

    return components
  }

    render() {
        return (
            <Fragment>
            
            <div onClick = {this.openDialog}>
                <p style={{margin: '0'}}>Rules</p>
            </div>

            <Dialog 
             PaperProps = {{
              style: {
                  borderRadius: '20px'
                },
          }}
                style = {this.dialogStyle}
                open={this.state.open} 
                TransitionComponent={this.Transition}
                fullWidth={true}
                maxWidth = {'sm'}
                aria-labelledby="form-dialog-title">
            <DialogTitle style = {{color: '#1A237E'}} id="form-dialog-title">Rules
            
            
            <IconButton onClick = {this.newRule} style={{float: 'right', color: '#1A237E'}} aria-label="delete">
              <AddBoxIcon fontSize="large" />
            </IconButton>

                        
            </DialogTitle>
            <Divider></Divider>
            <DialogContent style={{padding: '30px'}}>
                {this.renderRules()}
            </DialogContent>
            <DialogActions>
        
            
            

            </DialogActions>
          </Dialog>

{/* New rule ----------------------------------------------------------------------------*/}
          <Dialog 
             PaperProps = {{
              style: {
                  borderRadius: '20px'
                },
          }}
                style = {this.dialogStyle}
                open={this.state.newRuleOpen} 
                TransitionComponent={this.Transition}
                fullWidth={true}
                maxWidth = {'sm'}
                aria-labelledby="form-dialog-title">
            <DialogTitle style = {{color: '#1A237E'}} id="form-dialog-title">New Rule
            
            <IconButton onClick={this.submitNewRule} style={{float: 'right', color: '#1A237E'}} >
              <SaveIcon fontSize="large" />
            </IconButton>
            
            <IconButton onClick = {this.closeNewRule} style={{float: 'right', color: '#1A237E'}} >
              <CloseIcon fontSize="large" />
            </IconButton>

            

                        
            </DialogTitle>
            <Divider></Divider>
            <DialogContent style={{padding: '30px'}}>

            <FormControl style={{marginRight: '60px'}} variant="outlined">
              <InputLabel   htmlFor="age-simple">Condition</InputLabel>
              <Select
              onChange={this.changeCondition}
              value = {this.state.condition}
              style={{width: '150px'}}
                inputProps={{
                  name: 'age',
                  id: 'age-simple',
                }}
              >
                <MenuItem value={1}>To</MenuItem>
                <MenuItem value={2}>From</MenuItem>
                <MenuItem value={3}>Subject</MenuItem>
                <MenuItem value={4}>Cc</MenuItem>
              </Select>
            </FormControl>

            

          <FormControl  variant="outlined">
              <InputLabel   htmlFor="age-simple">Operation</InputLabel>
              <Select
              onChange = {this.changeOperation}
              value = {this.state.operation}
              style={{width: '150px'}}
                inputProps={{
                  name: 'age',
                  id: 'age-simple',
                }}
              >
                <MenuItem value={1}>Move</MenuItem>
                <MenuItem value={2}>Copy</MenuItem>
                <MenuItem value={3}>Delete</MenuItem>
              </Select>
            </FormControl>

            <TextField
                label="Value"
                style={{width: '100%'}}
                value={this.state.value}
                onChange={this.changeValue}
                multiline
                rowsMax="100"   
                margin="normal"
                variant='outlined'
                helperText={this.state.valueErrorMessage}
                error={this.state.valueErrorState}

                />

            </DialogContent>
            <DialogActions>

            

            </DialogActions>
          </Dialog>
        </Fragment>
        )
    }

    ruleIconStyle= {
      fontSize: '50px',
      color: '#fff',
      margin: 'auto',
      weight: '100%',
      textAlign: 'center',
      marginLeft: '23px',
      marginTop: '8px'
    }

    ruleTextStyle = {
      textAlign: 'center',
      color: '#FFFFFF',
      fontSize: '17px',
      margin: '0',
      fontWeight: '500',
      marginTop: '4px'
    }

    ruleBtn = {
      background: '#FFFFFF',
      width: '70%',
      borderRadius: '20px',
      fontSize: '18px',
      marginTop: '25px',
      marginLeft: '32px',
      color: 'rgba(240,47,194,1)'
    }

    ruleWrapperStyle = {
      height: '230px',
      width: '200px',
      borderRadius: '20px',
      display: 'inline-block',
      margin: '34px',
      boxShadow: '0px 0px 10px -2px rgba(0,0,0,0.75)',
      background: 'linear-gradient(45deg, rgba(240,47,194,1) 9%, rgba(96,148,234,1) 90%)'
    }
}

export default Rule
