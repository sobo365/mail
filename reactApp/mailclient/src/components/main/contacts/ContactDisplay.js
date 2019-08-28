import React, { Component } from 'react'

export class ContactDisplay extends Component {
    render() {
        return (
            <div style = {this.display}>
                
            </div>

        )
    }

    display = {
        position: 'fixed',
        display: 'inline-block',
        width: '40%',
        height: '400px',
        margin: '50px',
        marginRight: '100px',
        borderRadius: '10px',
        right: '0',
        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.5)'
    }
}

export default ContactDisplay
