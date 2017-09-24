import React from 'react';
import { Link, BrowserRouter as Router, Route } from  'react-router-dom';
import Dashboard from './dashboard';
import WishlistPublic from './wishlistPublic';
import WishlistPrivate from './wishlistPrivate';
import Pairing from './pairing';
import Messaging from './messaging';
import SecureOrg from './secureOrg';

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <ul>
            <li>
              <Link to="/dashboard">TEXT</Link>
            </li>
            <li>
              <Link to="/dashboard">TEXT</Link>
            </li>
            <li>
            </li>
            <li>
            </li>
            <li>
            </li>
            <li>
            </li>
          </ul>
        </Router>
      </div>
    );
  }
}

export default App;