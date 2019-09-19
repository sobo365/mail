import React, { Component } from 'react';
import axios from 'axios';

export class DeleteTag extends Component {

    handleDelete = () =>{
        var token = localStorage.getItem('token');
        
        axios({
          method: 'DELETE',
          url: 'http://localhost:8080/tag/deleteTag',
          params: {
              tagId : this.props.tagId

          },
          headers: {
            Authorization: 'Bearer ' + token
          }
        }).then((response) => {
            this.props.update(this.props.position);
           
          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {
            // always executed
          }); 
    }

    render() {
        return (
            <div style={{marginLeft: '3%', display: 'inline-block'}}>
                <i onClick = {this.handleDelete}  style={{color: '#ff3b30'}} class="fas fa-times"></i>
            </div>
        )
    }
}

export default DeleteTag
