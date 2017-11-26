import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {

  render () {
    return (
      <div className="header-container">
        <div className="col-3 header-group header-text">
          <Link to="/">
            Adopt A Family
          </Link>
        </div>

        <div className="col-8 header-group header-links-group">
          <Link className="header-links" to="/mission">
            Mission
          </Link>
          <Link className="header-links" to="/families">
            Our Families
          </Link>
          <Link className="header-links" to="/aboutus">
            About us
          </Link>
          <Link className="header-links" to="/donate">
            Donate
          </Link>
          <Link className="header-links" to="/registration">
            <button className="btn-registration">
              Adopt A Family
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Nav;
