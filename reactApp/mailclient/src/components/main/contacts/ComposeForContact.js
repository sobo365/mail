import React, { Fragment, Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import AttachmentItem from '../../dialogs/AttachmentItem';

import axios from 'axios'


import { resolve } from 'q';

export class Compose extends Component{

    state = {
        open: false,
        attachments: [],
        subject: '',
        to: '',
        toErrorMessage: '',
        toErrorValue: '',
        content: '',
        cc: '',
        bcc: ''
    }



   

    Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
    });

    handleToggle = () => {
      if(!this.state.open && localStorage.getItem('account_id') == null){
        alert('Please select account!');
      }else{
        this.setState({
          open: !this.state.open,
          attachments: [],
          to: this.props.email
      }) 
      }
          
    }

    sendMessage = () =>{

      var token = localStorage.getItem('token');
      axios({
        method: 'post',
        url: 'http://localhost:8080/mail/sendMessage',
        params: {
            to: this.state.to,
            subject: this.state.subject,
            content: this.state.content,
            cc: this.state.cc,
            bcc: this.state.bcc,
            accountId: localStorage.getItem('account_id')
            
            
        },
        data: {
            attachments: this.state.attachments        
          

        },
        headers: {
          Authorization: 'Bearer ' + token
        }
      }).then((response) => {
        alert();
         
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    }
    
    renderAttachments = () =>{
      let components = []
      console.log({attachments: this.state.attachments})
    
      for(let i = 0; i < this.state.attachments.length; i++){
        components.push(<AttachmentItem  id = {i} removeItem={this.removeAttachment.bind(this)} file = {this.state.attachments[i]}></AttachmentItem>)
      }

      return components

    }

    removeAttachment = (id) =>{
      this.state.attachments.splice(id, 1);
      this.forceUpdate();
    }

    f2b = (file) =>{
      return new Promise(resolve =>{
        var reader = new FileReader();

        reader.onload = function(event) {
          resolve(event.target.result);
        };

        reader.readAsDataURL(file);
      })
    }

    

    attachmentHandle = event =>{
      
      
      let file = event.target.files[0];
      //  console.log(file);
      // var reader;
      // var string;
      // if(file){
      //   reader = new FileReader();

      //   reader.onload =   readerEvent =>{
      //     string = readerEvent.target.result;
      //     console.log(btoa(string));
      //     this.state.attachments.push({name: file.name, data: btoa(string), mimeType: file.type})
      //     this.forceUpdate();
      //   }
      //   reader.readAsDataURL(file);
      // }

      this.f2b(file).then(result => {
        console.log(result.split(',')[1])
        this.state.attachments.push({name: file.name, data: result.split(',')[1], mimeType: file.type})
        this.forceUpdate();
      });
      

     
    }

    handleChangeTo = event =>{
      if(event.target.value != ''){
        this.setState({
          toErrorValue: false,
          to: event.target.value,
          toErrorText: ''
        })
      }else{
        this.setState({
          toErrorValue: true,
          to: '',
          toErrorText: 'Please enter address'
        })
      }
      
    }

    handleChangeSubject = event =>{
      this.setState({
        subject: event.target.value
      })
    }

    handleChangeCc = event =>{
      this.setState({
        cc: event.target.value
      })
    }

    handleChangeBcc = event =>{
      this.setState({
        bcc: event.target.value
      })
    }

    handleChangeContent = event =>{
      this.setState({
        content: event.target.value
      })
    }

    render(){
        
        const{open} = this.state

        
     
        return(
        
        <Fragment>

                        <div onClick={this.handleToggle} style={this.liWrapperAttachmentMail}>
                                <p style={this.liHeader}>Send Mail</p>     
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
                value={this.state.to}
                onChange={this.handleChangeTo}
                error = {this.state.toErrorValue}
                helperText={this.state.toErrorText}
              />

              <TextField
                label="Subject"
                style={this.form}
                value={this.state.subject}
                onChange={this.handleChangeSubject}
                multiline
                rowsMax="100"   
                margin="normal"
                variant='outlined'

                />

              <TextField
                label="Cc"
                style={this.form}
                multiline
                value={this.state.cc}
                onChange={this.handleChangeCc}
                rowsMax="100"   
                margin="normal"
                variant='outlined'

                />

              <TextField
                label="Bcc"
                style={this.form}
                value={this.state.bcc}
                onChange={this.handleChangeBcc}
                multiline
                rowsMax="100"   
                margin="normal"
                variant='outlined'

                />

              <TextField
                label="Content"
                style={this.form}
                value={this.state.content}
                onChange={this.handleChangeContent}
                multiline
                rowsMax="100"   
                margin="normal"
                variant='outlined'

                />
                <div style={{border: '1px solid #E0E0E0'}} >
                  {this.renderAttachments()}
                  <div class = 'input-wrapper'>
                  <div className="imgPreview">
                    <i style={this.attIcon} class="fas fa-paperclip"></i>
                    <p style={this.attachmentTitle}>Add </p>
                  </div>
                    <input type="file" name="file" onChange={this.attachmentHandle}/>
                  </div>
                  
                </div>
                
            </DialogContent>
            <DialogActions>

          <div onClick={this.sendMessage} id = 'composeSendBtn'>
            <p id = 'composeSendText'>Send</p>
            <i id = 'composeSendIco' class="fas fa-chevron-right"></i>
          </div>

           

            </DialogActions>
          </Dialog>
        </Fragment>
        )
        
    }

    liWrapperAttachmentMail = {
        display: 'inline-block', 
        width: '48%',
        marginTop: '5vh',
        borderRight: '3px solid white'

    }

    liHeader = {
        display: 'inline-block', 
        width: '100%',
        color: '#FFF',
        fontWeight: '600',
        fontSize: '22px',
        margin: '0px',
        marginTop: '15px'
    }

    attachmentTitle = {
      display : 'inline-block',
      margin: 0,
      fontSize: '18px',
      fontWeight: '500',
      color: '#424242'
  }

  attIcon = {
    display : 'inline-block',
    fontSize: '22px',
    marginRight: '12px',
    color: '#424242'
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