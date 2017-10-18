import React from 'react';
import links from '../constants/links';

const Footer = (props) => {
  return (
    <footer>
      <div className="footerText">
        <div className="footerCopyright">&copy; 2017 Adopt A Family</div>
        <div className="footerSpacer"> | </div>
        <div className="footerPrivacy">
          <a href={links.placeholder} rel="noopener noreferrer" target="_blank">Privacy Policy</a>
        </div>
        <div className="footerContact">
          <a href={links.placeholder} rel="noopener noreferrer" target="_blank">Contact Us</a>
        </div>
      </div>
      <div className="footerIcons">
        <a href={links.github} className="social-icon" rel="noopener noreferrer" target="_blank">
          <i className="fa fa-github fa-2x"></i>
        </a>
        <a href={links.email} className="social-icon" rel="noopener noreferrer" target="_blank">
          <i className="fa fa-envelope fa-2x"></i>
        </a>
        <a href={links.aboutus} className="social-icon" rel="noopener noreferrer" target="_blank">
          <i className=" fa fa-user-circle fa-2x"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;