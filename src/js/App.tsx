import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AboutUs from 'components/AboutUs';
import Dashboard from 'components/Dashboard';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Landing from 'components/Landing';
import Messaging from 'components/Messaging';
import Pairing from 'components/Pairing';
import React from 'react';
import Registration from 'components/Registration';
import SecureOrg from 'components/SecureOrg';
import WishlistPrivate from 'components/WishlistPrivate';
import WishlistPublic from 'components/WishlistPublic';

const App = () => {
  return (
    <React.Fragment>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/aboutus" component={AboutUs} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/secure/messaging" component={Messaging} />{' '}
          {/* Secure */}
          <Route path="/secure/org" component={SecureOrg} /> {/* Secure */}
          <Route path="/secure/pairing" component={Pairing} /> {/* Secure */}
          <Route path="/secure/wishlist" component={WishlistPrivate} />{' '}
          {/* Secure */}
          <Route path="/registration" component={Registration} />
          <Route path="/wishlist" component={WishlistPublic} />
        </Switch>

        <Footer />
      </Router>
    </React.Fragment>
  );
};

export default App;
