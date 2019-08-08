import React, { Component } from 'react'
import './SidebarLinkStyle.css'

export class SidebarLink extends Component {

    constructor(props){
        super(props);

        this.state = {
            value : '',
            icoName: '',
            active: false
        }
    }



    
    render() {
        return (
            <div className = {this.props.active ? 'sidebarLinkActive' : 'sidebarLink'}>
                <i class={this.props.icoName} style = {this.folderIco}></i>
                <p style = {this.folderIco} className = 'sidebarLinkText' >{this.props.value}</p>
            </div>
        )

    }

   

    folderIco = {
        marginLeft: '24px',
        display: 'inline-block'
    }
}

export default SidebarLink
