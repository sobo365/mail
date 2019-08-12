import React, { Component} from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import DeleteAccount from '../dialogs/DeleteAccount';

export class AccountCard extends Component {

  constructor(props){
    super(props);

    this.state = {
        displayname: '',
        username: '',
        smtpAddress: '',
        smtpPort: '',
        id: 0
    }
}

    render(){
        return (
            <div style = {this.cardStyle}>
              
                
                {/* <CardContent >
                  <Typography gutterBottom variant="h5" component="h2">
                    {this.props.displayname}
                  </Typography>
                  
                  <List style={this.liststyle} component="nav" aria-label="main mailbox folders">
                        <ListItem >
                          <p>Username: {this.props.username}</p>
                        </ListItem>

                        <ListItem >
                          <p>SMTP Address: {this.props.smtpAddress}</p>
                        </ListItem>

                        <ListItem >
                          <p>SMTP Port: {this.props.smtpPort}</p>
                        </ListItem>
            
                </List>
               
                </CardContent> */}

                <CardContent>
                  <h2 style = {this.displaynameStyle}>{this.props.displayname}</h2>
                  <div>
                    <p>Username:</p>
                    <p>{this.props.username}</p>  
                  </div>
                  
                  <p>{this.props.smtpAddress}</p>
                  <p>{this.props.smtpPort}</p>
                </CardContent>
              
              {/* <CardActions>
                <DeleteAccount acccount_id={this.props.id}></DeleteAccount>
                
                <Button size="medium" color="primary" variant='outlined' style={{width:'50%'}}>
                  Edit
                </Button>
              </CardActions> */}
            </div>
          );
    }

    liststyle = {
        color: '#fff'
    }

    displaynameStyle = {
      display: 'inline-block',
      margin: 'auto'
    }



    cardStyle = {
        color: '#fff',
        background: this.props.color,
        borderRadius: '30px',
        marginLeft: '13%',
        width: '70%',
        maxWidth: '70%',   
        marginTop: '20px',
        marginBottom: '70px',     
        boxShadow: ' 0px 6px 20px 1px  ' + this.props.color
    }

    
}

export default AccountCard
