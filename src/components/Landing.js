// Landing page for AAF.

import React from 'react';
import { Link } from 'react-router-dom';

const Landing = (props) => {
  return (
    <div>
      <h1>Landing page</h1>
      <ul>
        <li>
          <Link to="/dashboard">Click me for dashboard</Link>
        </li>
        <li>
          <Link to="/secure/pairing">Click me for secure/pairing</Link>
        </li>
        <li>
          <Link to="/secure/messaging">Click me for messaging</Link>
        </li>
        <li>
          <Link to="/wishlist">Click me for wishlistPublic</Link>
        </li>
        <li>
          <Link to="/secure/wishlist">Click me for secure/wishlistPrivate</Link>
        </li>
        <li>
          <Link to="/secure/org">Click me for secure/org</Link>
        </li>
        <li>
          <Link to="/aboutus">Click me for about us</Link>
        </li>
        <li>
          <Link to="/registration"><button>Register</button></Link>
        </li>
      </ul>
    </div>
  );
};

export default Landing;