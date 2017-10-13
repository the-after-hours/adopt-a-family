import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
  return (
    <header>
      <div>
        <Link to='/'>
          Adopt A Family
        </Link>
      </div>
      <div className="headerLinks">
        <div className="headerMission">
          Mission
        </div>
        <div className="headerFamily">
          Our Families
        </div>
        <div className="headerAbout">
          <Link to="/aboutus">
            About us
          </Link>
        </div>
        <div className="headerDonate">
          Donate
        </div>
        <Link to="/registration">
          <button className="buttonLogin">
            ADOPT A FAMILY
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
