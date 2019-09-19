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
            newTagTextField: false,
            tagName: ''
        }
    }

    handleNewTag = () =>{
        this.setState({
            newTagParagraph: false,
            newTagTextField: true,
            
        })
    }

    saveTag = () =>{
        if(this.state.tagName.trim() != ''){
            this.props.appendTag(this.state.tagName);
            this.setState({
                newTagParagraph: true,
                newTagTextField: false,
                tagName: ''
            })
        }
        
        
    }

    hangeChangeTagName = event =>{
        this.setState({
            tagName: event.target.value
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
                        onChange={this.hangeChangeTagName}
                        value={this.state.tagName}
                        id={this.state.newTagTextField? 'newTagTextField' : 'newTagTextFieldHidden'}
                        
                    />
                    <i onClick={this.saveTag} id={this.state.newTagTextField? 'newTagSave' : 'newTagSaveHidden'}
                      class="fas fa-save"></i>

                    <p id = {this.state.newTagParagraph ? 'newTagParagraph' : 'newTagParagraphHidden'}></p>
                </ListItem>
            </div>
            
        )
    }
}

export default NewTag
