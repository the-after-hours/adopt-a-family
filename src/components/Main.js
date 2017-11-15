import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AboutUs from './AboutUs';
import Dashboard from './Dashboard';
import Footer from './Footer';
import Landing from './Landing';
import Messaging from './Messaging';
import Header from './Header';
import Pairing from './Pairing';
import Registration from './Registration';
import SecureOrg from './SecureOrg';
import WishlistPrivate from './WishlistPrivate';
import WishlistPublic from './WishlistPublic';

const Main = (props) => (
  <div>
    <Header />
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/aboutus" component={AboutUs} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/secure/messaging" component={Messaging} /> {/* Secure */}
      <Route path="/secure/org" component={SecureOrg} /> {/* Secure */}
      <Route path="/secure/pairing" component={Pairing} /> {/* Secure */}
      <Route path="/secure/wishlist" component={WishlistPrivate} /> {/* Secure */}
      <Route path="/registration" component={Registration} />
      <Route path="/wishlist" component={WishlistPublic} />
    </Switch>

    <Footer />
  </div>
);

export default Main;
