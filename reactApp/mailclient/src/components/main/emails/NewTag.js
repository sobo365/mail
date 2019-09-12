import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import TextField from '@material-ui/core/TextField';
import './tag.css'

export class NewTag extends Component {

    constructor(props){
        super(props);

        this.state = {
            newTagParagraph: true,
            newTagTextField: false
        }
    }

    handleNewTag = () =>{
        this.setState({
            newTagParagraph: false,
            newTagTextField: true,
            
        })
    }
    

    render() {
        return (
            <div>
                <ListItem 
                    button
                    onClick = {this.handleNewTag}
                >
                    <ListItemAvatar>
                        <Avatar style={{background: '#fff', fontSize: '20px'}} >
                            <i style = {{color: '#616161',fontSize: '20px' }} class="fas fa-plus"></i>
                        </Avatar>
                    </ListItemAvatar>
                    <TextField
                        id={this.state.newTagTextField? 'newTagTextField' : 'newTagTextFieldHidden'}
                        label="Name"
                        margin="normal"
                    />
                    <i id={this.state.newTagTextField? 'newTagSave' : 'newTagSaveHidden'}
                      class="fas fa-save"></i>

                    <p id = {this.state.newTagParagraph ? 'newTagParagraph' : 'newTagParagraphHidden'}></p>
                </ListItem>
            </div>
            
        )
    }
}

export default NewTag
