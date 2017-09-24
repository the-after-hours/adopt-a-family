import React from 'react';
import { Route , Switch } from  'react-router-dom';
import Landing from './landing';
import Dashboard from './dashboard';
import WishlistPublic from './wishlistPublic';
import WishlistPrivate from './wishlistPrivate';
import Pairing from './pairing';
import Messaging from './messaging';
import SecureOrg from './secureOrg';

const Main = (props) => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/wishlist" component={WishlistPublic} />
        <Route path="/secure/wishlist" component={WishlistPrivate} /> {/* Secure */}
        <Route path="/secure/pairing" component={Pairing} /> {/* Secure */}
        <Route path="/secure/messaging" component={Messaging} /> {/* Secure */}
        <Route path="/secure/org" component={SecureOrg} /> {/* Secure */}
      </Switch>
      <footer>
        <a href="/">
          <button>
            Home
          </button>
        </a>
      </footer>
    </div>
  )
}

export default Main;