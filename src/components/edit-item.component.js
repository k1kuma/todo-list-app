import axios from 'axios';
import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Datetime from 'react-datetime';
import Card from 'react-bootstrap/Card';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import "react-datetime/css/react-datetime.css";

// set-up to dis-allow users from picking a date
// prior to current date on a todo list item.
import moment from 'moment';
const yesterday = moment().subtract( 1, 'day' );
const valid = function( current ){
    return current.isAfter( yesterday );
};
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
    this.props.history.push('/');
  }

  render() {
    return(<div class="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>
              <Form.Group controlId="Title">
              <Form.Control
                required
                type="text"
                placeholder="Title" 
                value={this.state.title}
                onChange={this.onChangeItemTitle}
              />
              </Form.Group>
            </Card.Title>
            <Form.Group controlId="Status">
              <Form.Control
                as="select"
                value={this.state.status}
                onChange={this.onChangeItemStatus}>
                <option>backlog</option>
                <option>pending</option>
                <option>done</option>
              </Form.Control>
            </Form.Group>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>
              <Form.Group controlId="Description">
                <Form.Control
                  plaintext
                  as="textarea"
                  required
                  type="text"
                  placeholder="description"
                  bssize="large"
                  value={this.state.description}
                  onChange={this.onChangeItemDescription}
                />
              </Form.Group>
            </ListGroupItem>
            <ListGroupItem>
              {/* 
              // Reference URLs below for getting calendar icon replacing dropdown bar for calendar.
              // https://www.npmjs.com/package/react-bootstrap-icons
              // https://icons.getbootstrap.com/icons/calendar-check-fill/
              */}
              <Form.Group controlId="Duedate">
                <Form.Label>Due Date</Form.Label>
                <Datetime
                  timeFormat={false}
                  onChange={this.onChangeItemDuedate}
                  isValidDate={valid}
                  closeOnSelect={ true }
                  initialValue={this.state.duedate}
                />
              </Form.Group>
            </ListGroupItem>
          </ListGroup>
          <div class="flex">
            <Button class="flex-child" variant="primary" size="lg" block="block" type="submit"> Update </Button>
            <Button class="flex-child" variant="secondary" size="lg" block="block" type="submit"> Close </Button>
          </div>
        </Card>
      </Form>
    </div>);
  }
}
