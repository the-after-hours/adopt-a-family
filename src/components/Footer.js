import React from 'react';
import links from '../constants/links';

const d = new Date();
const year = d.getFullYear();

const Footer = (props) => {
  return (
    <footer id="footer" className="footer">
      <div className="footerText">
        <div className="footerCopyright">&copy; {year} Adopt A Family</div>
        <div className="footerSpacer"> | </div>
        <div className="footerPrivacy">
          <a href={links.placeholder} target="_blank">Privacy Policy</a>
        </div>
        <div className="footerContact">
          <a href={links.placeholder} target="_blank">Contact Us</a>
        </div>
        {/* <div id="license">Code written under <a href={links.license}>MIT license</a></div> */}
      </div>

      <div className="footerIcons">
        <a href={links.github} className="social-icon" target="_blank">
          <i className="fa fa-github fa-2x"></i>
        </a>
        <a href={links.email} className="social-icon" target="_blank">
          <i className="fa fa-envelope fa-2x"></i>
        </a>
        <a href={links.aboutus} className="social-icon" target="_blank">
          <i className=" fa fa-user-circle fa-2x"></i>
        </a>

      </div>
    </footer>
  );
};

export default Footer;