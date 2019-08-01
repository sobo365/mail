import React, { Component } from 'react'

export class SuccessfulRegistration extends Component {

    componentDidMount(){
        setTimeout(() =>{
            this.props.history.push('/login');
        }, 3000);
    }

    render() {
        return (
            <div>
                <i class="fas fa-check" style = {this.iconStyle}></i>
                <p style={this.fontStyle}>You are registered, now you can Log In.</p>
            </div>
        )
    }

    fontStyle = {
        fontSize: '30px'
    }

    iconStyle = {
        fontSize: '200px',
        fontWeight: '900',
        marginTop: '10%',
        color: '#0091EA'
    }
}

export default SuccessfulRegistration
