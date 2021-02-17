import React, {Component} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import "react-datetime/css/react-datetime.css";
import { Link } from 'react-router-dom';

// module to create date-picker element https://github.com/arqex/react-datetime
import Datetime from 'react-datetime';
import axios from 'axios';

// set-up to dis-allow users from picking a date
// prior to current date on a todo list item.
// import moment from 'moment';
// const yesterday = moment().subtract( 1, 'day' );
// const valid = function( current ){
//     return current.isAfter( yesterday );
// };

export default class CreateItem extends Component {

  constructor(props) {
    super(props)

    // Setting up functions
    this.onChangeItemTitle = this.onChangeItemTitle.bind(this);
    this.onChangeItemDescription = this.onChangeItemDescription.bind(this);
    this.onChangeItemStatus = this.onChangeItemStatus.bind(this);
    this.onChangeItemDuedate = this.onChangeItemDuedate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      title: '',
      description: '',
      status: 'backlog',
      duedate: ''
    }
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

    axios.post('http://localhost:4000/items/create-item', itemObj).then(res => 
      console.log(res.data)
    );

    this.setState({title: '', description: '', status: 'backlog', duedate: ''});

    // Redirect to Item List 
    this.props.history.push('/item-list')
  }

  render() {
    return (<div class="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            required
            type="text"
            value={this.state.title}
            onChange={this.onChangeItemTitle}
          />
        </Form.Group>

        <Form.Group controlId="Description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            required
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

        {/* 
        // Reference URLs below to get calendar icon replacing dropdown bar for calendar.
        // https://www.npmjs.com/package/react-bootstrap-icons
        // https://icons.getbootstrap.com/icons/calendar-check-fill/
        */}
        <Form.Group controlId="Duedate">
          <Form.Label>Due Date</Form.Label>
          <Datetime
            timeFormat={false}
            onChange={this.onChangeItemDuedate}
          />
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit">
            Save
        </Button>

      </Form>
    </div>);
  }
}
