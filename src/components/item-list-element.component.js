import React, { Component } from "react";
import { Button, Card } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


export default class ItemListElement extends Component {

  constructor(props) {
    super(props)
    this.deleteItem = this.deleteItem.bind(this);
  }

  deleteItem() {
    this.props.deleteItem(this.props.obj._id)
  }

  render() {
    return (
      <div>
        <Card key={this.props.obj.key} style={{ width: '18rem' }} className="mb-2">
          <Button onClick={this.deleteItem}>x</Button>
          <Link style={{color: 'dark'}} to={"/edit-item/" + this.props.obj._id} className="nav-link"> 
            <Card.Header align="left">{this.props.obj.title}</Card.Header>
            <Card.Body align="left">
            <Card.Text>
              {this.props.obj.description}
            </Card.Text>
            </Card.Body>
            <Card.Footer>
              <div class="column">
                <small class="row">Status: {this.props.obj.status} </small>
                <small class="row">Due Date: {this.props.obj.duedate.substring(0,10)}</small>
              </div>
            </Card.Footer>
          </Link>
        </Card>
      </div>
    )
  }
}
