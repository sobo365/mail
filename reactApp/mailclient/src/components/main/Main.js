import React, { Component } from 'react'
import Button from '@material-ui/core/Button'

export class Main extends Component {

    componentDidMount() {
        if(localStorage.getItem('token') == null){
            this.props.history.push('/login');
        }
     }

     logoutBtn = event =>{
         localStorage.removeItem('token');
         this.props.history.push('/login')
     }

    render() {
        return (
            <div>
                <h3>Main Page</h3>
                <Button
                    onClick = {this.logoutBtn}>
                    Log Out
                </Button>
            </div>
        )
    }
}

export default Main