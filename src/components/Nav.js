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
          title="Adopt-a-Family"
          onLeftIconButtonTouchTap={this.handleDrawerToggle}
        />
        <Drawer
          docked={false}
          open={this.state.drawerOpen}
          onRequestChange={(open) => this.setState({
            drawerOpen: open
          })}
        >
          <MenuItem>
            <Link to="/">Home</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/dashboard">Dashboard</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/wishlist">Wishlist</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/aboutus">About Us</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/secure/wishlist">Wishlist Secure</Link> {/* Secure */}
          </MenuItem>
          <MenuItem>
            <Link to="/secure/pairing"> Pairing</Link> {/* Secure */}
          </MenuItem>
          <MenuItem>
            <Link to="/secure/messaging">Messaging</Link> {/* Secure */}
          </MenuItem>
          <MenuItem>
            <Link to="/secure/org">Org</Link> {/* Secure */}
          </MenuItem>
        </Drawer>
      </div>
    );
  }
}

export default Nav;