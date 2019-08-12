import React, { Component } from 'react'
import Sidebar from '../sidebar/Sidebar'
import AddFolder from '../../dialogs/FolderDialog'

export class Folders extends Component {
    constructor(props){
        super(props);

        this.state = {
            username: ''
        }
    }

    componentDidMount() {
        if(localStorage.getItem('token') == null){
            this.props.history.push('/login');
        }
        this.state.username = localStorage.getItem('username');
     }
     

    render() {
        return (
            <div>
                <Sidebar folders></Sidebar> 
                <AddFolder></AddFolder>
                <p style={this.title}>Folders</p>               

                
                
            </div>
        )
    }

    title = {
        fontSize: '35px',
        fontWeight: '500',
        color: '#3b3462',
        float: 'left',
        marginLeft: '13%'
    }
}

export default Folders
