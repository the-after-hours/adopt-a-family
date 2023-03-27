import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import AboutUs from './pages/AboutUs';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import Messaging from './pages/Messaging';
import Pairing from './pages/Pairing';
import Registration from './pages/Registration';
import SecureOrg from './pages/SecureOrg';
import WishlistPrivate from './pages/WishlistPrivate';
import WishlistPublic from './pages/WishlistPublic';

/* Note: createBrowserRouter method over BrowserRouter component allows us to leverage
 * react-router's loader functionality
 * https://reactrouter.com/en/main/route/loader
 *
 */
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route exact path="/" element={Landing}>
      <Route path="aboutus" element={AboutUs} />
      <Route path="dashboard" element={Dashboard} />
      <Route path="secure/messaging" element={Messaging} /> {/* Secure */}
      <Route path="secure/org" element={SecureOrg} /> {/* Secure */}
      <Route path="secure/pairing" element={Pairing} /> {/* Secure */}
      <Route path="secure/wishlist" element={WishlistPrivate} />
      {/* Secure */}
      <Route path="registration" element={Registration} />
      <Route path="wishlist" element={WishlistPublic} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
