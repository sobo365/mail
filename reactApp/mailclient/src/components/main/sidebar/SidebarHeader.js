import React, { Component } from 'react'
import Button from '@material-ui/core/Button'

export class SidebarHeader extends Component {

    constructor(props){
        super(props);

        this.state = {
            username : ''
        }
    }

    toggleDrawable = () => {
       

    }

    render() {
        return (
            <div style={this.sidebarHeader}>
                 {/* <Button style ={this.hamburger} 
                        onClick = {this.toggleDrawable}
                 > <i class="fas fa-bars"></i></Button> */}
               
                <p style = {this.paragraph}>Hello, {this.props.username}</p>
                <hr style ={this.sidebarSeparator}></hr>  
            </div>
        )
    }

    hamburger = {
        color: '#fff',
        fontSize: '22px',
        margin: '5px',
      
    }

    sidebarHeader = {
        textAlign: 'left'
    }

    paragraph = {
        cursor : 'context-menu',
        marginLeft: '25px'
    }

    sidebarSeparator = {
        margin : 'auto',
        width: '80%',
        color: '#fff',
        border: '1px solid white '
    }
}

export default SidebarHeader
