import React, { Component } from 'react'
import SidebarLink from './SidebarLink'

export class SidebarFooter extends Component {

    constructor(props){
        super(props);
    }

    logout = (event) =>{
        localStorage.clear();
        window.location.replace('/login');

        event.preventDefault();
    }

    render() {
        return (

            <div 
            style = {this.sidebarFooter}>
                {/* <hr style = {this.sidebarSeparator}></hr> */}
               
               <ul style = {this.listItem} >
                    <li
                        onClick = {this.logout}
                    ><SidebarLink 
                    icoName="fas fa-sign-out-alt" 
                    value = "Sign Out">
                    </SidebarLink></li>
               </ul>

            </div>
 
        )
    }

    listItem = {
        padding: '0',
        listStyle: 'none'
    }


    sidebarSeparator = {
        margin : 'auto',
        width: '80%',
        color: '#fff',
        border: '1px solid white '
    }

    sidebarFooter = {
        marginBottom: '21px',
        bottom : '0',
        width: '100%',
        position: 'absolute'
    }
}

export default SidebarFooter
