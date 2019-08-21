import React, { Component } from 'react'
import Sidebar from '../sidebar/Sidebar'
import FoldersSidebar from './FoldersSidebar'

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
                
                <FoldersSidebar></FoldersSidebar>             

                
                
            </div>
        )
    }

}

export default Folders
