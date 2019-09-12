import React, { Component, Fragment } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';
import Move from '../main/emails/MoveDialog';
import AddTag from '../main/emails/TagDialog';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import Chip from '@material-ui/core/Chip';
import xIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';


import './Message.css'


export class Message extends Component {

    state = {
        open: false,
        unread : this.props.message.unread,
        menu: false,
        xPosition: 0,
        yPosition: 0,
        anchorEl: '',
        attachments : [],
        tags: []
    }

    

    openDialog = (e) => {
      
            this.setState({
                open: true,
                content: '',
                subject: '',
                from: ''
            }) ;
       
        
        
            
    }
    

    closeDialog = (e) => {

        this.setState({
            open: false,
            content: '',
            subject: '',
            from: ''
            
        }) ;
    }


    
    openMessage = () => {
        var token = localStorage.getItem('token');
    
        axios({
          method: 'get',
          url: 'http://localhost:8080/mail/read',
          params: {
              id: this.props.message.id
          },
          headers: {
            Authorization: 'Bearer ' + token
          }
        }).then((response) => {
            this.openDialog();
           this.setState({
            unread: false,
            attachments: response.data.Attachments,
            tags: response.data.Tags
           })
           console.log(response.data)
           
          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {
            // always executed
          }); 
    }

    formatDate = () =>{
        let current = new Date();
        let date = new Date(this.props.message.dateTime);
        let retVal = ''
        if((current - date) <= 82800000){
            let hours = date.getHours();
            let mins = date.getMinutes();
            if(hours.toString().length == 1){
                hours = '0' + hours;
            }
            if(mins.toString().length == 1){
                mins = '0' + mins;
            }
            retVal = hours + ':' + mins;
        }else{
            retVal = date.getDate() + '.' + parseInt(date.getMonth() + 1)  + '.' + date.getFullYear();
        }

        return retVal;


    }

    openMenu = (e) =>{
       
        if(this.props.menuAvailable){
            if(this.state.menu){
                this.setState({
                    anchorEl: null
                })
            }else{
            this.setState({
                menu: true,
                xPosition: e.pageX,
                yPosition: e.pageY,
                anchorEl: e.currentTarget 
            })
        }
    }
        
    }

    closeMenu = (e) => {
        
        this.setState({
            anchorEl: null,
            menu: false,
            
        })
    }

    

    renderAttachments = () =>{
        let components = []

        for(let i = 0; i < this.state.attachments.length; i++){
            if(this.state.attachments[i].mimeType.startsWith('image')){
                let data = 'data:image/png;base64, ' + this.state.attachments[i].data;
                components.push(
                    <div id = 'imgItem'>
                        <img id = 'imgItemImage' style={{margin: '20px', borderRadius: '20px'}} width='200' height= '200' src={data} alt="Prewiev unavailable" />
                        <a  href = {data} download={this.state.attachments[i].name} id="imgItemDownload">Download</a>
                    </div>
                    )
                
           
            }else if(this.state.attachments[i].mimeType === 'application/pdf'){
                let data = 'data:application/pdf;base64, ' + this.state.attachments[i].data;
                let name = this.state.attachments[i].name;
                if(this.state.attachments[i].name.length > 20){
                    name = this.state.attachments[i].name.substring(0,17);
                    name += '..  .'
                    name += this.state.attachments[i].name.substring(this.state.attachments[i].name.length - 3, this.state.attachments[i].name.length)
                }
                components.push(
                    <div id = 'pdfItem'>
                        <div id = 'pdfItemIcoWrapper'><i id = 'pdfItemIco' class="far fa-file-pdf"></i>
                        <a  href = {data} download={this.state.attachments[i].name} id="pdfItemDownload"><i style={{fontSize: '50px'}} class="fas fa-download"></i></a>
                        </div>
                        <div><p id = 'pdfItemIcoText'>{name}</p></div>
                        
                    </div>
                    
                   )
                
                
            }
            }

        return components
    }

    renderTags = () =>{
        let components = []

        for(let i = 0; i < this.state.tags.length; i++){
            components.push(
                <Chip color="secondary" style={{margin: '5px'}} label={this.state.tags[i].name} onDelete={ () => {this.handleDeleteTag(this.state.tags[i].id)}} />
            )
        }

        return components
    }

    handleDeleteTag = (tagIdVal) =>{
        var token = localStorage.getItem('token');
    
        axios({
          method: 'post',
          url: 'http://localhost:8080/tag/deleteFromMessage',
          params: {
              messageId: this.props.message.id,
              tagId: tagIdVal
          },
          headers: {
            Authorization: 'Bearer ' + token
          }
        }).then((response) => {
            alert()
           
          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {
            // always executed
          }); 
    }

   

    render() {
        const{open} = this.state
        return (
            <Fragment>
                
                    <div onClick={this.openMenu} style={{display: 'inline-block', width: '3%'}}>
                     <i style= {{fontSize: '20px', color: '#9E9E9E'}} class="fas fa-ellipsis-v"></i>
                     <Menu
                            id="simple-menu"
                            onClose={this.closeMenu}
                            open={this.state.menu}
                            anchorEl={this.state.anchorEl}
                            PaperProps = {{
                                style: {
                                    borderRadius: '20px'
                                  },
                            }}
                            style={{ marginLeft: this.state.xPosition - 100}}      
                                   
                        >

                            <Move closeMenu={this.closeMenu} update={this.props.update} message={this.props.message}></Move>
                            <AddTag closeMenu={this.closeMenu} messageId = {this.props.message.id}></AddTag>
                            <MenuItem>
                            <DeleteIcon onClick={this.closeMenu} fontSize="medium" style={{color:'#616161', marginRight: '13px'}}/>
                            Delete</MenuItem>
                            

                        </Menu>
                    </div>
                    
                   


                    
                <ListItem style={this.state.unread ? this.unread: this.read} 
                          button 
                          alignItems="flex-start"
                          onClick={this.openMessage}>
                        <ListItemAvatar style={{display: 'inline-block'}}>
                            {/* <Avatar style={{background: '#6f32ff'}}> <i class="far fa-user"></i></Avatar> */}
                            
                            <Avatar style={{ background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'}}>{this.props.message.from[0].toUpperCase()}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                        style={{display: 'inline-block'}}
                        primary={
                            <Box fontWeight={this.state.unread ? "fontWeightBold" : "fontWeightRegular"} m={1} 
                                    style={{display: 'inline-block', margin: '0', fontSize: '18px'}}>
                                   {this.props.message.subject ? this.props.message.subject : 'No Subject'} 
                            </Box>
                            
                        }
                        secondary={
                            <Fragment>
                            <Typography
                                style={{display: 'inline-block'}}
                                component="span"
                                variant="body2"
                                fontWeight= 'fontWeightBold'
                                color="textPrimary" >
                                <Box fontWeight={this.state.unread ? "fontWeightBold" : "fontWeightRegular"} m={1} 
                                    style={{display: 'inline-block', margin: '0', fontSize: '16px'}}>
                                    {this.props.message.from}
                                </Box>
                            </Typography>
                            {" — " + this.props.message.content.substring(0,30) + ' ...'}
                            </Fragment>
                        }
                        />
                         
                        <div style={{float: 'right'}}>
                        <i style={{display: this.state.unread ? 'inline-block' : 'none', margin: '16px' , color: '#2196F3'}}  class="fas fa-circle"></i>
                       <p style={{display:'inline-block'}}> {this.formatDate()}</p>
                        </div>
                       
                       
                        
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    
    

                <Dialog
                    scroll={'body'}
                    maxWidth={'xl'}
                    fullWidth={true}
                    open={open}
                    
                    BackdropProps = {{
                        style: {
                            backgroundColor: 'rgba(	38,50,56, 0.95)',
                            boxShadow: 'none',
                          },
                    }}
                    PaperProps = {{
                        style: {
                            borderRadius: '20px'
                          },
                    }}
                    onClose={this.closeDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle style={{width: '95%', textAlign: 'center'}} id="alert-dialog-title">
                       

                        <PopupState variant="popover" popupId="demo-popup-popover">
                    {popupState => (
                        <div style={{display: 'inline-block', float: 'left'}}>
                        <IconButton variant="contained" {...bindTrigger(popupState)}>
                             <i class="fas fa-info-circle"></i>
                        </IconButton>
                        <Popover
                        PaperProps = {{
                            style: {
                                borderRadius: '20px',
                                padding: '30px'
                              },
                        }}
                            {...bindPopover(popupState)}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        >
                            <Typography >From: {this.props.message.from}</Typography>
                            <Typography >To: {this.props.message.dateTime}</Typography>
                            <Typography >Cc: {this.props.message.cc ? this.props.message.cc : ''}</Typography>
                            <Typography >Bcc: {this.props.message.bcc ? this.props.message.bcc : ''}</Typography>
                            <Typography >Tags: 
                            {this.renderTags()}
                            </Typography>
                        </Popover>
                        </div>
                    )}
                    </PopupState>

                    {this.props.message.subject ? this.props.message.subject: 'No Subject'}
                        <div style = {{display: 'inline-block', float: 'right'}}>
                            <i 
                            id = 'closeBtn'
                            onClick = {this.closeDialog}
                            class="fas fa-times"></i>
                        </div>

                    </DialogTitle>


                    <DialogContent>
                    
                    <DialogContentText style={this.messageContent} id="alert-dialog-description">
                        {this.props.message.content}
                    </DialogContentText>

                    <Divider></Divider>
                    {this.renderAttachments()}
                    </DialogContent>
                    
                    

                    <DialogActions>
                   
                    </DialogActions>
                </Dialog>               
                
            </Fragment>
        )
    }

   

    messageContent = {
        margin: '35px',
        marginTop: '60px'
        
    }

    unread = {
        display: 'inline-block',
        fontWeight: '600',
        width: '97%'
    }

    read = {
       display: 'inline-block',
        width: '97%'
    }

   
    
}

export default Message
