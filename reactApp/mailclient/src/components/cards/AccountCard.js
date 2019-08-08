import React, { Component} from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';

export class AccountCard extends Component {
    render(){
        return (
            <Card style = {this.cardStyle}>
              
                <CardMedia
                  src="https://cdn.pixabay.com/photo/2015/09/22/14/34/african-lion-951778__340.jpg"
                  title="Contemplative Reptile"
                />
                <CardContent >
                  <Typography gutterBottom variant="h5" component="h2">
                    Bonko
                  </Typography>
                  <Divider/>
                  <List style={this.liststyle} component="nav" aria-label="main mailbox folders">
                        <ListItem >
                      
                        <ListItemText primary="Username: Zvonko " />
                        </ListItem>

                        <ListItem >
                        <ListItemText primary="Address: bonkoz@gmail.com" />
                        </ListItem>

                        <ListItem >
                        <ListItemText primary="SMTP Port: 557" />
                        </ListItem>
                        <Divider/>
                        <ListItem >
                        <ListItemText primary="Server Type: " />
                        </ListItem>

                        <ListItem >
                        <ListItemText primary="Server Address: " />
                        </ListItem>

                        <ListItem >
                        <ListItemText primary="Server Port: 557" />
                        </ListItem>
                </List>
                <Divider/>
                </CardContent>
              
              <CardActions>
                <Button size="medium" color="secondary">
                  Delete
                </Button>
                <Button size="medium" color="primary">
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
