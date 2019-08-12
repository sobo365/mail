import React, { Component } from 'react'
import SelectAccount from '../../dialogs/AccountSelectDialog';

export class SidebarHeader extends Component {

    constructor(props){
        super(props);

        this.state = {
            username : ''
        }
    }

  
    

    

    render() {
        return (
            <div style={this.sidebarHeader}>               
               <SelectAccount></SelectAccount>
                
            </div>
        )
    }

   

    sidebarHeader = {
        textAlign: 'left',
        marginTop: '10px',
        marginBottom: '70px'
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
