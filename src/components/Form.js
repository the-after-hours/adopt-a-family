import React from 'react';
import Input from './Input';
import Select from './Select';

class Form extends React.Component {
  render() {
    return (
      <div>
        <div className="contact">
          <form>
            <span className="contact-label">
              First Name:
            </span>
            <Input
              placeholder="First Name"
              type="text"
            /><br /><br />
            <span className="contact-label">
              Middle Initial:
            </span>
            <Input
              maxlength="1"
              placeholder="Middle Initial"
              type="text"
            /><br /><br />
            <span className="contact-label">
              Last Name:
            </span>
            <Input
              placeholder="Last Name"
              type="text"
            /><br /><br />
            <span className="contact-label">
              Address
            </span>
            <Input
              placeholder="Address"
              type="text"
            /><br /><br />
            <span className="contact-label">
              Account Type:
            </span>
            <Select /><br /><br />
            <span className="contact-label">
              Email:
            </span>
            <Input
              placeholder="Email"
              type="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
            /><br /><br />
            <span className="contact-label">
              Confirm Email
            </span>
            <Input
              placeholder="Confirm Email"
              type="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
            /><br /><br />
            <span className="contact-label">
              Password:
            </span>
            <Input
              placeholder="Password"
              type="password"
              pattern=".{6,}"
              title="Must be at least 6 characters."
            /><br /><br />
            <span className="contact-label">
              Confirm Password
            </span>
            <Input
              placeholder='Confirm Password'
              type="passwrd"
              pattern=".{6,}"
            /><br /><br />
            <input className="contact-label" type="submit" value='Submit' />
          </form>
        </div>
      </div>
    );
  }
}

export default Form;