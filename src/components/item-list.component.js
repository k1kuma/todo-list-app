import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import ItemTableRow from './item-table-row.component';

export default class ItemList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      items: []
    };
  }

  // componentDidMount() {
  //   axios.get('http://localhost:4000/items/').then(res => {
  //     this.setState({
  //       items: res.data
  //     });
  //   }).catch((error) => {
  //     console.log(error);
  //   })
  // }

  DataTable() {
    console.log('<MK>: ' + JSON.stringify((this.state.items)));
    axios.get('http://localhost:4000/items/').then(res => {
      this.setState({
        items: res.data
      });
    }).catch((error) => {
      console.log(error);
    })
    return this.state.items.map((res, i) => {
      return <ItemTableRow obj={res} key={i} />;
    });
  }

  render() {
    return (<div className="table-wrapper">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.DataTable()}
        </tbody>
      </Table>
    </div>);
  }
}