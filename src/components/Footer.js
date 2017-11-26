import React from 'react';
import links from '../constants/links';

const Footer = (props) => {
  return (
    <footer id="footer">
      <div className ="block-center">
        <div className="social-icon-group">
          <table>
          <tbody>
            <tr>
              <td>
                <a href={links.github} className="social-icon">
                  <i className="fa fa-github fa-2x"></i>
                </a>
              </td>
              <td>
                <a href={links.email} className="social-icon">
                  <i className="fa fa-envelope fa-2x"></i>
                </a>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="block-center">
        <div className="footer-text">
          Code written under <a href={links.license}>MIT license</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;