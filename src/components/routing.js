import { Route } from 'react-router-dom';

<div>
  <Route exact path="/" component={Landing} />
  <Route path="/dashboard" component={Dashboard} />
  <Route path="/wishlist" component={WishlistPublic} />
  <Route path="/secure/wishlist" component={WishlistPrivate} /> {/* Secure */}
  <Route path="/secure/pairing" component={Pairing} /> {/* Secure */}
  <Route path="/secure/messaging" component={Messaging} /> {/* Secure */}
  <Route path="/secure/org" component={SecureOrg} /> {/* Secure */}
</div>;