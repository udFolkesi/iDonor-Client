import React, { Component } from 'react';
import { Button, Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, ButtonGroup } from 'reactstrap';
import { Link, Router} from 'react-router-dom';
import './NavMenu.css';
import { useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import { Layout } from './Layout';

export class NavMenuUpd extends Component {
  static displayName = NavMenuUpd.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      isVisible: false,
      //onShow: true
    };

    //this.OnShow = this.OnShow.bind(this); // Add this line
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  refresh() {
    localStorage.setItem('authorized', false);
    console.log(localStorage.getItem('token'));
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    //Layout.refreshComp();
    window.location.href = "/";
  }

  toggleVisibility = () => {
    this.setState(prevState => ({
      isVisible: !prevState.isVisible
    }));
  };

  render() {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
          <img src="https://cdn-icons-png.flaticon.com/512/893/893529.png" style={{ width: '23px' }} />
          <NavbarBrand tag={Link} to="/">iDonor</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse mr-5" isOpen={!this.state.collapsed} navbar>
          <ul className="navbar-nav flex-grow">
            <NavItem>
              <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
            </NavItem>
            {localStorage.getItem('role') == "Admin" && (
            <NavItem>
              <NavLink tag={Link} className="text-dark" to="/data">Data</NavLink>
            </NavItem>
            )}
            {localStorage.getItem('role') == "Admin" && (
            <NavItem>
              <NavLink tag={Link} className="text-dark" to="/reports">Reports</NavLink>
            </NavItem>
            )}
            <NavItem>
              <NavLink tag={Link} className="text-dark" to="/donations">Donations</NavLink>
            </NavItem>
          </ul>
          </Collapse>
          <div>
        <Dropdown>
      <Dropdown.Toggle variant="primary" /*className="rounded-circle"*/>
        Me
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
        <Dropdown.Item>Another action</Dropdown.Item>
        <Dropdown.Item onClick={this.refresh}>Log out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
        </div>
        </Navbar>
      </header>
    );
  }
}