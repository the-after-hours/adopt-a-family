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
              name="firstName"
              placeholder="First Name"
              type="text"
            /><br />
            <span className="contact-label">
              Middle Initial:
            </span>
            <Input
              name="middleInitial"
              maxlength="1"
              placeholder="Middle Initial"
              type="text"
            /><br />
            <span className="contact-label">
              Last Name:
            </span>
            <Input
              name="lastName"
              placeholder="Last Name"
              type="text"
            /><br />
            <span className="contact-label">
              Address
            </span>
            <Input
              name="address"
              placeholder="Address"
              type="text"
            /><br />
            <span className="contact-label">
              Account Type:
            </span>
            <Select name="accountType"/><br />
            <span className="contact-label">
              Email:
            </span>
            <Input
              name="email"
              placeholder="Email"
              type="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
            /><br />
            <span className="contact-label">
              Confirm Email
            </span>
            <Input
              placeholder="Confirm Email"
              type="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
            /><br />
            <span className="contact-label">
              Password:
            </span>
            <Input
              name="password"
              placeholder="Password"
              type="password"
              pattern=".{6,}"
              title="Must be at least 6 characters."
            /><br />
            <span className="contact-label">
              Confirm Password
            </span>
            <Input
              placeholder="Confirm Password"
              type="password"
              pattern=".{6,}"
              title="Must be at least 6 characters"
            /><br />
            <button type="submit">SUBMIT</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Form;