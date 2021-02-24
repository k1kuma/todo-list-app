import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { withRouter } from 'react-router';
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";

import ItemList from './components/item-list.component';
import CreateItem from './components/create-item.component';
import EditItem from './components/edit-item.component';

function App() {
  return (<Router>
    <div className="App">
      <header className="App-header">
        {/* <Navbar bg="dark" variant="dark"> */}
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">
              <img
                alt=""
                src="https://react-bootstrap.github.io/logo.svg"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}
              ToDo List
            </Navbar.Brand>
            <Nav className="justify-content-end">
              <Nav>
                <Link to={"/create-item"} className="nav-link">
                  Create Item
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
                  <Route path="/create-item" component={CreateItem}/>
                  <Route path="/edit-item/:id" component={(EditItem)}/>
                  <Route path="/" component={ItemList}/>
                </Switch>
              </div>
            </Col>
          </Row>
        </Container>
    </div>
  </Router>);
}

export default App;
