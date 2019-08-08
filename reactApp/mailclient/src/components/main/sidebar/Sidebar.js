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
                    <li ><NavLink to = '/emails'><SidebarLink active={this.props.emails} icoName="far fa-envelope" value = "Emails"></SidebarLink></NavLink></li>
                    <li ><NavLink to = '/accounts'><SidebarLink active={this.props.accounts} icoName="far fa-user" value = "Accounts"></SidebarLink></NavLink></li>
                    <li ><NavLink to = '/contacts'><SidebarLink active={this.props.contacts} icoName="far fa-address-book" value = "Contacts"></SidebarLink></NavLink></li>
                    <li ><NavLink to = '/folders'><SidebarLink active={this.props.folders} icoName="far fa-folder" value = "Folders"></SidebarLink></NavLink></li>
                </ul>
                
                <SidebarFooter></SidebarFooter>
            </div>
        )
    }

    

    sidebar = {
        fontSize: '21px',
        color: '#fff',
        position: 'fixed',
        top: '0',
        left: '0',
        background: '#2CA8FF',
        height: '100%',
        width: '15%',
        boxShadow: '0 2px 22px 0 rgba(0,0,0,.2),0 2px 30px 0 rgba(0,0,0,.35)'
    }

    listItem = {
        padding: '0',
        listStyle: 'none'
    }
}

export default Sidebar
