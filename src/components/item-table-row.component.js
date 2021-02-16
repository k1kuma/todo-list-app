import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class ItemTableRow extends Component {
  constructor(props) {
    super(props);
    this.deleteItem = this.deleteItem.bind(this);
  }

  deleteItem() {
    console.log('deleting');
    axios.delete('http://localhost:4000/items/delete-item/' + this.props.obj._id).then((res) => {
      console.log('Item successfully deleted!')
    }).catch((error) => {
      console.log(error)
    })
  }

  render() {
    return (
      <tr>
        <td>{this.props.obj.title}</td>
        <td>{this.props.obj.description}</td>
        <td>{this.props.obj.status}</td>
        <td>{this.props.obj.duedate}</td>
        <td>
          <Link className="edit-link" to={"/edit-item/" + this.props.obj._id}>
            Edit
          </Link>
          <br/>
          <Button onClick={this.deleteItem} size="sm" variant="danger">Delete</Button>
        </td>
      </tr>
    );
  }
}