import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Datetime from 'react-datetime';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class EditItem extends Component {

  constructor(props) {
    super(props)

    this.onChangeItemTitle = this.onChangeItemTitle.bind(this);
    this.onChangeItemDescription = this.onChangeItemDescription.bind(this);
    this.onChangeItemStatus = this.onChangeItemStatus.bind(this);
    this.onChangeItemDuedate = this.onChangeItemDuedate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: '',
      description: '',
      status: '',
      duedate: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/items/edit-item/' + this.props.match.params.id).then(res => {
      this.setState({
        title: res.data.title,
        description: res.data.description,
        status: res.data.status,
        duedate: res.data.duedate
      });
    }).catch((error) => {
      console.log(error);
    })
  }

  onChangeItemTitle(e) {
    this.setState({ title: e.target.value })
  }

  onChangeItemDescription(e) {
    this.setState({ description: e.target.value })
  }

  onChangeItemStatus(e) {
    this.setState({ status: e.target.value })
  }

  onChangeItemDuedate(e) {
    this.setState({ duedate: e })
  }

  onSubmit(e) {
    e.preventDefault()

    const itemObj = {
      title: this.state.title,
      description: this.state.description,
      status: this.state.status,
      duedate: this.state.duedate
    };

    axios.put('http://localhost:4000/items/update-item/' + this.props.match.params.id, itemObj)
      .then((res) => {
        console.log(res.data)
        console.log('Item successfully updated')
      }).catch((error) => {
        console.log(error)
      })

    // Redirect to Item List 
    this.props.history.push('/item-list')
  }

  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={this.state.title}
            onChange={this.onChangeItemTitle}
          />
        </Form.Group>

        <Form.Group controlId="Description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            value={this.state.description}
            onChange={this.onChangeItemDescription}
          />
        </Form.Group>

        <Form.Group controlId="Status">
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="select"
            value={this.state.status}
            onChange={this.onChangeItemStatus}>
            <option>backlog</option>
            <option>pending</option>
            <option>done</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="Duedate">
          <Form.Label>Due Date</Form.Label>
          <Datetime
            timeFormat={false}
            onChange={this.onChangeItemDuedate}
          />
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit">
          <Link to={"/item-list"} className="nav-link">
            Save
          </Link>
        </Button>
        {/* <Button variant="danger" size="lg" block="block" type="submit">
          Update Item
        </Button> */}
      </Form>
    </div>);
  }
}