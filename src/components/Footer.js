import React from 'react';

const Footer = (props) => {
  return (
    <div className="" id="footer">
      <div className="social-icon-group">
        <div className="block-center">
          <a href="http://github.com/5-gwoap" className="social-icon">
            <i className="fa fa-github fa-2x"></i>
          </a>
          <a href="#" className="social-icon">
            <i className="fa fa-envelope fa-2x"></i>
          </a>
        </div>
      </div>
      <div className="block-center">
        <div className="footer-text">
          Code written under <a href="https://opensource.org/licenses/mit-license.html">MIT license</a>
        </div>
      </div>
    </div>
  );
};


export default Footer;