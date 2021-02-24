import React, { Component } from "react";
import axios from 'axios';
import { Button, Card, ListGroup, ListGroupItem, Modal } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


export default class ItemListElement extends Component {

  constructor(props) {
    super(props)
    this.deleteItem = this.deleteItem.bind(this);
  }

  // Clicking the 'x' on a card will remove that card
  deleteItem() {
    this.props.deleteItem(this.props.obj._id)
  }

  render() {
    return (
      <div>
        {/* <Card border="none" key={this.props.obj.key} style={{ width: '18rem' }} className="mb-2">
          <Modal.Dialog>
            <Modal.Header closeButton={this.sample} onClick={this.deleteItem}>
              <Modal.Title>{this.props.obj.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p align="left">{this.props.obj.description}</p>
            </Modal.Body>
            <Modal.Footer>
            <div class="row">
              <small margin-right="15em" class="column">Status: {this.props.obj.status} </small>
              <small class="column">Due Date: {this.props.obj.duedate.substring(0,10)}</small>
            </div>
            </Modal.Footer>
          </Modal.Dialog>
        </Card> */}
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
