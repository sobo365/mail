import React, { Fragment, Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import ListItem from '@material-ui/core/ListItem';
import axios from 'axios';
import PageviewIcon from '@material-ui/icons/Pageview';
import Avatar from '@material-ui/core/Avatar';
import './contact.css'

export class ContactDialog extends Component{

    state = {
        open: false,

        displayname: '',
        displaynameErrorValue: false,
        displaynameErrorMessage: '',

        firstname: '',
        firstnameErrorValue: false,
        firstnameErrorMessage: '',

        lastname: '',
        firstnameErrorValue: false,
        firstnameErrorMessage: '',
        
        email: '',
        emailErrorValue: false,
        emailErrorMessage: '',
        
        note: '',
        noteErrorValue: false,
        noteErrorMessage: '',

        file: "", 
        imagePreviewUrl: "" 
    }

    Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
    });

    handleDisplaynameChange = event =>{
      if(event.target.value.trim() === ''){
        this.setState({
          displayname: '',
          displaynameErrorValue: true,
          displaynameErrorMessage: 'Empty field!'
        })
      }else{
        this.setState({
          displaynameErrorValue: false,
          displaynameErrorMessage: '',
          displayname: event.target.value
        })
      }
    }

    handleFirstnameChange = event =>{
      if(event.target.value.trim() === ''){
        this.setState({
          firstname: '',
          firstnameErrorValue: true,
          firstnameErrorMessage: 'Empty field!'
        })
      }else{
        this.setState({
          firstnameErrorValue: false,
          firstnameErrorMessage: '',
          firstname: event.target.value
        })
      }
    }

    handleLastnameChange = event =>{
      if(event.target.value.trim() === ''){
        this.setState({
          lastname: '',
          lastnameErrorValue: true,
          lastnameErrorMessage: 'Empty field!'
        })
      }else{
        this.setState({
          lastnameErrorValue: false,
          lastnameErrorMessage: '',
          lastname: event.target.value
        })
      }
    }

    handleEmailChange = event =>{
      if(event.target.value.trim() === ''){
        this.setState({
          email: '',
          emailErrorValue: true,
          emailErrorMessage: 'Empty field!'
        })
      }else{
        this.setState({
          emailErrorValue: false,
          emailErrorMessage: '',
          email: event.target.value
        })
      }
    }

    handleNoteChange = event =>{
      if(event.target.value.trim() === ''){
        this.setState({
          note: '',
          noteErrorValue: true,
          noteErrorMessage: 'Empty field!'
        })
      }else{
        this.setState({
          noteErrorValue: false,
          noteErrorMessage: '',
          note: event.target.value
        })
      }
    }

    handleToggle = () => {
           this.setState({
              open: !this.state.open,
              
              displayname: '',
              displaynameErrorValue: false,
              displaynameErrorMessage: '',

              firstname: '',
              firstnameErrorValue: false,
              firstnameErrorMessage: '',

              lastname: '',
              lastnameErrorValue: false,
              lastnameErrorMessage: '',
              
              email: '',
              emailErrorValue: false,
              emailErrorMessage: '',
              
              note: '',
              noteErrorValue: false,
              noteErrorMessage: '',
              file: '',
              imagePreviewUrl: ''
           }) 
    }

    handleSubmit = () =>{
      if(this.state.displayname.trim() === ''){
        this.setState({
          displaynameErrorValue: true,
          displaynameErrorMessage: 'Empty field!'
        })
      }else if(this.state.firstname.trim() === ''){
        this.setState({
          firstnameErrorValue: true,
          firstnameErrorMessage: 'Empty field!'
        })
      }else if(this.state.lastname.trim() === ''){
        this.setState({
          lastnameErrorValue: true,
          lastnameErrorMessage: 'Empty field!'
        })
      }else if(this.state.email.trim() === ''){
        this.setState({
          emailErrorValue: true,
          emailErrorMessage: 'Empty field!'
        })
      }else if(this.state.note.trim() === ''){
        this.setState({
          noteErrorValue: true,
          noteErrorMessage: 'Empty field!'
        })
      }else{
        var formData = new FormData();
        formData.append('photo', 'ok');

        var token = localStorage.getItem('token');
          axios({
            method: 'post',
            url: 'http://localhost:8080/contact/add',
            data: {
              displayname: this.state.displayname,
              firstname: this.state.firstname,
              lastname: this.state.lastname,
              email: this.state.email,
              note: this.state.note
             
            },
            params: {
              id: localStorage.getItem('user_id'),
              photo: formData
            },
            headers: {
              'Content-Type' : 'multipart/form-data',
              Authorization: 'Bearer ' + token
            }
          }).then((response) => {
            this.handleToggle(); 
            this.props.update();
                    
          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {
            // always executed
          }); 

        }    
      
    }

    handleImageChange(e) {
      e.preventDefault();
  
      let reader = new FileReader();
      let file = e.target.files[0];
  
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        });
      };
      
      reader.readAsDataURL(file);

    }

    render(){
        
        const{open} = this.state

        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
          $imagePreview = <img style={{width: '100px', height: '100px', borderRadius: '50%'}} src={imagePreviewUrl} />;
        } else {
          $imagePreview = (
            <i id='selectIco' class="far fa-user"></i>
          );
        }
     
        return(
        
        <Fragment>
           
              <ListItem onClick={this.handleToggle} button style={this.listElement}>
                <i style={this.ico} class="fas fa-plus"></i>
              </ListItem>

              

            <Dialog 
                style = {this.dialogStyle}
                open={open} 
                TransitionComponent={this.Transition}
                fullWidth={true}
                maxWidth = {'md'}
                aria-labelledby="form-dialog-title">
            <DialogTitle style = {{color: '#1A237E'}} id="form-dialog-title">New Contact
            
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
            <DialogContent>



            <div class="upload-btn-wrapper">
              <div className="imgPreview">
                {$imagePreview}
              </div>
              <input 
              type="file" 
              name="myfile"
              accept="image/*"
              id="contained-button-file"
              multiple
              onChange={e => this.handleImageChange(e)}
              type="file" />
            </div>
            

              <TextField
                label="Display Name"
                style={this.form}
                margin="normal"
                variant="outlined"
                value={this.state.displayname}
                onChange={this.handleDisplaynameChange}
                error={this.state.displaynameErrorValue}
                helperText={this.state.displaynameErrorMessage}
              />

            <TextField
                label="First Name"
                style={this.form}
                margin="normal"
                variant="outlined"
                value={this.state.firstname}
                onChange={this.handleFirstnameChange}
                error={this.state.firstnameErrorValue}
                helperText={this.state.firstnameErrorMessage}
              />

            <TextField
                label="Last Name"
                style={this.form}
                margin="normal"
                variant="outlined"
                value={this.state.lastname}
                onChange={this.handleLastnameChange}
                error={this.state.lastnameErrorValue}
                helperText={this.state.lastnameErrorMessage}
              />

            <TextField
                label="Email"
                style={this.form}
                margin="normal"
                variant="outlined"
                value={this.state.email}
                onChange={this.handleEmailChange}
                error={this.state.emailErrorValue}
                helperText={this.state.emailErrorMessage}
              />

            <TextField
                label="Note"
                style={this.form}
                margin="normal"
                variant="outlined"
                value={this.state.note}
                onChange={this.handleNoteChange}
                error={this.state.noteErrorValue}
                helperText={this.state.noteErrorMessage}
              />
              
             

            </DialogContent>
            <DialogActions>

            

            </DialogActions>
          </Dialog>
        </Fragment>
        )
        
    }
    
    listElement = {
        border: '3px dashed #BDBDBD',
        borderRadius: '15px',
        height: '85px',
        width: '85%',
        margin: 'auto',
        marginTop: '20px'
    }

    ico = {
      margin: 'auto',
      fontSize: '45px',
      color: '#BDBDBD'
    }

    btn = {
      fontSize: '20px',
      fontWeight: '500',
      width: '110px',
      float: 'right',
      marginTop: '0px',
    }


    form = {
      width: '100%'
    }

} 
    
export default ContactDialog