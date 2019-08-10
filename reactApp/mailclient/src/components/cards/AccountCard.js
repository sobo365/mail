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
            <Card style = {this.cardStyle}>
              
                <CardMedia
                  src="https://cdn.pixabay.com/photo/2015/09/22/14/34/african-lion-951778__340.jpg"
                  title="Contemplative Reptile"
                />
                <CardContent >
                  <Typography gutterBottom variant="h5" component="h2">
                    {this.props.displayname}
                  </Typography>
                  <Divider/>
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
                <Divider/>
                </CardContent>
              
              <CardActions>
                <DeleteAccount acccount_id={this.props.id}></DeleteAccount>
                
                <Button size="medium" color="primary" variant='outlined' style={{width:'50%'}}>
                  Edit
                </Button>
              </CardActions>
            </Card>
          );
    }

    liststyle = {
        color: '#616161'
    }



    cardStyle = {
        float: 'left',
        width: '30%',
        maxWidth: '30%',
        margin: '20px', 
        display: 'inline-block'
    }

    
}

export default AccountCard
