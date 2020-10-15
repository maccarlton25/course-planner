import React from 'react';
import { Navbar, Nav, Button, } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { HashLink as HLink } from 'react-router-hash-link';
import { Route, Switch} from 'react-router-dom';
import Home from '../pages/Home.jsx';
import About from '../pages/About.jsx';
import Login from '../pages/Login.jsx';
import Schedule from '../pages/Schedule.jsx';
import Settings from '../pages/Settings.jsx';

const NavbarContainer = () => {

    return (
        <>
            <Navbar sticky="top" bg="light" variant="light" className="navbar">
                <Navbar.Brand className="mr-auto logo-nav">UNC Schedule Tracker</Navbar.Brand>
                <Nav className="mx-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="about">About</Nav.Link>
                    <Nav.Link as={Link} to="schedule">My Schedule</Nav.Link>
                    <Nav.Link as={Link} to="settings">Settings</Nav.Link>
                </Nav>
                <Button as={Link} to="login" variant="dark" className="ml-auto">Login</Button>
            </Navbar>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/about" component={About}/>
                <Route exact path="/schedule" component={Schedule}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/settings" component={Settings}/>
            </Switch>
        </>
    )
}

export default NavbarContainer;