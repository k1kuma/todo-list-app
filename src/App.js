import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import CreateItem from './components/create-item.component';
import EditItem from './components/edit-item.component';
import ItemList from './components/item-list.component';
import ItemTableRow from './components/item-table-row.component'

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";

function App() {
  return (<Router>
    <div className="App">
      <header className="App-header">
        {/* <Navbar bg="dark" variant="dark"> */}
        <Navbar>
          <Container>
          <Navbar.Brand>
              <Link to={"/item-list"} className="nav-link">
                todo list app
              </Link>
            </Navbar.Brand>
            <Nav className="justify-content-end">
              <Nav>
                <Link to={"/create-item"} className="nav-link">
                  Create Item
                </Link>
              </Nav>

              <Nav>
                <Link to={"/item-list"} className="nav-link">
                  Item List
                </Link>
              </Nav>
            </Nav>
          </Container>
        </Navbar>
      </header>
      <Container>
          <Row>
            <Col md={12}>
              <div className="wrapper">
                <Switch>
                  <Route exact path='/' component={CreateItem} />
                  <Route path="/create-item" component={CreateItem} />
                  <Route path="/edit-item/:id" component={EditItem} />
                  <Route path="/item-list" component={ItemList} />
                </Switch>
              </div>
            </Col>
          </Row>
        </Container>
    </div>
  </Router>);
}

export default App;
