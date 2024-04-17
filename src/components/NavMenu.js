import React, { Component } from 'react';
import { Button, Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link, Router} from 'react-router-dom';
import './NavMenu.css';
import { useState } from "react";
import LogIn from './LogIn';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      isVisible: false
      //onShow: true
    };

    //this.OnShow = this.OnShow.bind(this); // Add this line
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  toggleVisibility = () => {
    this.setState(prevState => ({
      isVisible: !prevState.isVisible
    }));
  };

  refresh() {
   // LogIn.authorized = false;
    //alert(LogIn.authorized);
  }

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
            {/* <NavItem>
              <NavLink tag={Link} className="text-dark" to="/data">Data</NavLink>
            </NavItem> 
            <NavItem>
              <NavLink tag={Link} className="text-dark" to="/donations">Donations</NavLink>
            </NavItem> */}
          </ul>
          </Collapse>
          <Link  to="/log-in-form">
            <button type="button" class="btn btn-outline-secondary mr-2">Log in</button>
          </Link>
          <Link to="/sign-up-form">
            <button type="button" class="btn btn-secondary mr-2">Sign up</button>
          </Link>
        </Navbar>
      </header>
    );
  }
}