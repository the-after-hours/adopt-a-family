import React from 'react';
import links from '../constants/links';

const Footer = (props) => (
  <footer>
    <div className="footer-text">
      <div className="footer-item footer-copyright">&copy; 2017 Adopt A Family</div>
      <div className="footer-item footer-spacer"> | </div>
      <div className="footer-item">
        <a href={links.placeholder} rel="noopener noreferrer" target="_blank">Privacy Policy</a>
      </div>
      <div className="footer-item">
        <a href={links.placeholder} rel="noopener noreferrer" target="_blank">Contact Us</a>
      </div>
    </div>
    <div className="footer-icons">
      <a href={links.github} className="social-icon footer-item" rel="noopener noreferrer" target="_blank">
        <i className="fa fa-github fa-2x"></i>
      </a>
      <a href={links.email} className="social-icon footer-item" rel="noopener noreferrer" target="_blank">
        <i className="fa fa-envelope fa-2x"></i>
      </a>
      <a href={links.aboutus} className="social-icon footer-item" rel="noopener noreferrer" target="_blank">
        <i className=" fa fa-user-circle fa-2x"></i>
      </a>
    </div>
  </footer>
);

export default Footer;