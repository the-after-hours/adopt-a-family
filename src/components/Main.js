import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from './Landing';
import Dashboard from './Dashboard';
import WishlistPublic from './WishlistPublic';
import WishlistPrivate from './WishlistPrivate';
import AboutUs from './AboutUs';
import Pairing from './Pairing';
import Messaging from './Messaging';
import SecureOrg from './SecureOrg';
import Nav from './Nav';
import Footer from './Footer';

const Main = (props) => {
  return (
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/wishlist" component={WishlistPublic} />
        <Route path="/aboutus" component={AboutUs} />
        <Route path="/secure/wishlist" component={WishlistPrivate} /> {/* Secure */}
        <Route path="/secure/pairing" component={Pairing} /> {/* Secure */}
        <Route path="/secure/messaging" component={Messaging} /> {/* Secure */}
        <Route path="/secure/org" component={SecureOrg} /> {/* Secure */}
      </Switch>

      <Footer />
    </div>
  );
};

export default Main;
