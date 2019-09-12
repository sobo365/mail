import React, { Component} from 'react';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import DeleteAccount from '../../dialogs/DeleteAccount';
import UpdateAccount from './UpdateAccount';

export class AccountCard extends Component {

  constructor(props){
    super(props);

    this.state = {
        displayname: this.props.displayname,
        username: this.props.username,
        smtpAddress: '',
        smtpPort: '',
        id: 0
    }
}

   

    render(){


        return (
            <div style = {this.cardStyle}>
              <Grid container>
              <Grid item>
                  <div style={this.media}>
                    <i class="fas fa-portrait"></i>
                  </div>
                </Grid>
                <Grid item>
                <CardContent style={{display: 'flex', flexDirection: 'column', width: '33vw'}}>

                  
                    <p style = {this.displaynameStyle}>{this.props.displayname}</p>
                    <div>
                      <p style = {this.usernamestyle}>{this.props.username}</p>  
                    </div>

                    <ul style = {this.liststyle}>
                      <li style = {this.listitem}>
                        <div>
                          <p style={this.listItemValue} >{this.props.smtpPort}</p>  
                          <p >SMTP Port</p>  
                        </div>
                      </li>
                      <li>
                        <div style = {this.listitem}>
                          <p style={this.listItemValue}>{this.props.smtpAddress}</p>  
                          <p >SMTP Address</p>  
                        </div>
                      </li>
                      <li>
                        <div style = {this.listitem}>
                          <p style={this.listItemValue}>{this.props.smtpAddress}</p>  
                          <p >Server Address</p>  
                        </div>
                      </li>
                      <li>
                        <div style = {this.listitem}>
                          <p style={this.listItemValue}>{this.props.smtpAddress}</p>  
                          <p >Server Port</p>  
                        </div>
                      </li>
                    </ul>
                    </CardContent>
                </Grid>

             
                
                <Grid item style={{width:'15%'}} >
                  <UpdateAccount 
                                 id={this.props.id}
                                 displayname = {this.props.displayname} 
                                 username = {this.props.username} 
                                 smtpPort = {this.props.smtpPort}
                                 smtpAddress= {this.props.smtpAddress}
                                 password = {this.props.password}
                                 update={this.props.update}
                                 ></UpdateAccount>
                  <DeleteAccount acccount_id={this.props.id}></DeleteAccount>
                  
                </Grid>
                
                </Grid>
                
            </div>
          );
    }

    
    media = {
      width: '10vw',
      height: '200px',
      margin: '30px',
      marginTop: '40px',
      color: '#fff',
      fontSize: '160px'
    }

  

  
    liststyle = {
      listStyleType: 'none',
      margin: '0',
      padding: '0',
      overflow: 'hidden',
      display: 'flex'
    }

    listitem = {
      float: 'left',
      margin: '10px',
      
    }

    listItemValue = {
      fontWeight: '600',
      fontSize: '20px'
    }

    displaynameStyle = {
      fontWeight: '700',
      fontSize: '50px',
      display: 'flex',
      float: 'left',
      margin: '10px',
      marginLeft: '15px'
    }

    usernamestyle={
      fontWeight: '500',
      fontSize: '20px',
      display: 'flex',
      float: 'left',
      margin: '10px',
      marginLeft: '15px'
    }

    cardStyle = {
      color: '#fff',
      background: this.props.background,
      borderRadius: '30px',
      marginLeft: '13%',
      width: '70%',
      height: '300px',
      maxWidth: '70%',   
      marginTop: '20px',
      marginBottom: '70px',     
       boxShadow: '   0px 2px 10px 2px ' + this.props.color
  }

  
  

    
}

export default AccountCard
