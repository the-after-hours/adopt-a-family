import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {

  render () {
    return (
      <div>
        <div className='header-text'>
          <Link to='/'>
            Adopt A Family
          </Link>
        </div>
        <div className="header-links">
          <div className="header-mission">
            Mission
          </div>
          <div className="header-family">
            Our Families
          </div>
          <div className="header-about">
            <Link to="/aboutus">
              About us
            </Link>
          </div>
          <div className="header-donate">
            Donate
          </div>
          <Link to="/registration">
            <button className="button-login">
              ADOPT A FAMILY
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Nav;
