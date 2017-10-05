import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom';

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      drawerOpen: false,
    };

    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
  }
  handleDrawerToggle() {
    this.setState({
      drawerOpen: !this.state.drawerOpen
    });
  }
  render () {
    return (
      <div>
        <AppBar
          title={
            <Link style={{
              color: '#ffffff',
              textDecoration: 'none'
            }} to="/">
              Adopt-a-Family
            </Link>
          }
          onLeftIconButtonTouchTap={this.handleDrawerToggle}
        />
        <Drawer
          docked={false}
          open={this.state.drawerOpen}
          onRequestChange={(open) => this.setState({
            drawerOpen: open
          })}
        >

          <Link to="/">
            <MenuItem>Home</MenuItem>
          </Link>
          <Link to="/dashboard">
            <MenuItem>Dashboard</MenuItem>
          </Link>
          <Link to="/wishlist">
            <MenuItem>Wishlist</MenuItem>
          </Link>
          <Link to="/aboutus">
            <MenuItem>About Us</MenuItem>
          </Link>
          <Link to="/secure/wishlist">
            <MenuItem>Wishlist Secure</MenuItem> {/* Secure */}
          </Link>
          <Link to="/secure/pairing">
            <MenuItem>Pairing</MenuItem> {/* Secure */}
          </Link>
          <Link to="/secure/messaging">
            <MenuItem>Messaging</MenuItem> {/* Secure */}
          </Link>
          <Link to="/secure/org">
            <MenuItem>Org</MenuItem> {/* Secure */}
          </Link>
        </Drawer>
      </div>
    );
  }
}

export default Nav;
