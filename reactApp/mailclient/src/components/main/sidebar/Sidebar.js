import React, { Component } from 'react'
import SidebarLink from './SidebarLink'
import SidebarFooter from './SidebarFooter'
import SidebarHeader from './SidebarHeader'
import {Route, NavLink, HashRouter, Redirect, BrowserRouter } from 'react-router-dom'


export class Sidebar extends Component {

    constructor(props){
        super(props);

        this.state = {
            username : '',
            home: false,
            accounts: false,
            emails: false,
            contacts: false,
            folders: false
        }
    }

    componentWillMount(){
        this.state.username = localStorage.getItem('username');
        
    }

  

 

    render() {
        return (
            <div
            style = {this.sidebar}>

            
                <SidebarHeader username = {this.state.username}> </SidebarHeader>  

                <ul style = {this.listItem}>
                    <li ><NavLink to = '/home'><SidebarLink active={this.props.home} icoName="fas fa-home" value = "Home"></SidebarLink></NavLink></li>
                    <li ><NavLink to = '/emails'><SidebarLink active={this.props.emails} icoName="fas fa-envelope" value = "Emails"></SidebarLink></NavLink></li>
                    <li ><NavLink to = '/accounts'><SidebarLink active={this.props.accounts} icoName="fas fa-address-book" value = "Accounts"></SidebarLink></NavLink></li>
                    <li ><NavLink to = '/contacts'><SidebarLink active={this.props.contacts} icoName="fas fa-user" value = "Contacts"></SidebarLink></NavLink></li>
                    <li ><NavLink to = '/folders'><SidebarLink active={this.props.folders} icoName="fas fa-folder" value = "Folders"></SidebarLink></NavLink></li>
                </ul>
                
                <SidebarFooter></SidebarFooter>
            </div>
        )
    }

    

    sidebar = {
        fontSize: '25px',
        color: '#fff',
        position: 'fixed',
        top: '0',
        left: '0',
        background: '#fff',
        height: '100%',
        width: '7%'
   
    }

    listItem = {
        padding: '0',
        listStyle: 'none'
    }
}

export default Sidebar
