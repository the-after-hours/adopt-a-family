// Page to create/About Us

import React from 'react';
import links from '../constants/links';

const AboutUs = (props) => {
  return (
    <div>
      <h1>AboutUs page</h1>
      Check us out on <a href={links.github}>Github</a>!
    </div>
  );
};

export default AboutUs;