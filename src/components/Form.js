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
            /><br />
            <span className="contact-label">
              Middle Initial:
            </span>
            <Input
              maxlength="1"
              placeholder="Middle Initial"
              type="text"
            /><br />
            <span className="contact-label">
              Last Name:
            </span>
            <Input
              placeholder="Last Name"
              type="text"
            /><br />
            <span className="contact-label">
              Account Type:
            </span>
            <Select /><br />
            <span className="contact-label">
              Email:
            </span>
            <Input
              placeholder="Email"
              type="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
            /><br />
            <span className="contact-label">
              Password:
            </span>
            <Input
              placeholder="Password"
              type="password"
              pattern=".{6,}"
              title="Must be at least 6 characters."
            />
          </form>
        </div>
      </div>
    )
  };
};

export default Form;