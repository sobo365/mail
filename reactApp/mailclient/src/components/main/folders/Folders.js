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
                 <h3>Folders</h3>                

                
                
            </div>
        )
    }
}

export default Folders
