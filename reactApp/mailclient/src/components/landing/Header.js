import React, { Component } from 'react'


export class Header extends Component {
    render() {
        return (
         <nav style = {this.header}>
             <h3
                style = {this.logo}
             >Space<span style = {this.logoSecond}>Mail</span></h3>

        
             
         </nav>
        );
    }

   

    logo = {
        userSelect: 'none',
        color: '#616161',
        fontWeight: '300',
        fontSize : '40px',
        marginTop: '30px',
        marginRight: '70%'
    }

    logoSecond = {
        color: '#2CA8FF',
        fontWeight: '400'
    }
}

export default Header
