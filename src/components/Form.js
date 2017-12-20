import React from 'react';
import PropTypes from 'prop-types';

import Input from './Input';
// import Select from './Select';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.validateMatch = this.validateMatch.bind(this);
    this.validateLength = this.validateLength.bind(this);
  }

  handleChange(event) {
    let state = Object.assign({}, this.state);

    state[event.target.name] = event.target.value;

    let currentEvent = event.target.name;
    this.setState(state, () => {
      currentEvent === 'confirmEmail' && this.validateLength(event);
    });
  }

  validateMatch(event) {
    const email = this.state.email;
    const confirmEmail = this.state.confirmEmail;

    if(email !== confirmEmail) {
      event.preventDefault();
      alert('email doesn\'t match');
    }
  }

  validateLength(event) {
    const email = this.state.email;
    const confirmEmail = this.state.confirmEmail;

    if (email.length !== confirmEmail.length) {
      // Add an invalidated color to the input box (red)
      this.setState({emailValidation: false});
    } else {
      // Add a validated color to the border       (green)
      this.setState({emailValidation: true});
    }
  }

  render() {
    let isValidated = this.state.emailValidation ? 'emailValid' : 'emailInvalid';

    const {formTitle} = this.props;

    const animate = true;

    return (
      <div className="form-wrapper">
        <h2>{formTitle}</h2>
        <div className="contact">
          <form id="registration">
            <div className="form-field-group">
              <Input
                animate={animate}
                label="First Name"
                name="firstName"
              />

              <Input
                animate={animate}
                label="Middle Initial"
                maxLength={1}
                name="middleInitial"
                size={1}
              />

              <Input
                animate={animate}
                label="Last Name"
                name="lastName"
              />
            </div>

            <div className="form-field-group">
              <Input
                animate={animate}
                label="Address"
                name="address"
              />

              <Input
                animate={animate}
                label="City"
                name="city"
              />
            </div>

            <div className="form-field-group">
              <Input
                animate={animate}
                label="Zipcode"
                name="zipcode"
              />

              <Input
                animate={animate}
                label="State"
                menuType="states"
                name="states"
                list="states"
              />

              <Input
                animate={animate}
                label="Account Type"
                menuType="accountType"
                name="accountType"
                list="accountType"
              />
            </div>

            <Input
              label="Email"
              name="email"
              onChange={this.handleChange}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
              type="email"
            />

            <Input
              className={isValidated}
              label="Confirm Email"
              name="emailConfirm"
              onChange={this.handleChange}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
              type="email"
            />

            <Input
              label="Password"
              name="password"
              pattern=".{6,}"
              title="Must be at least 6 characters."
              type="password"
            />

            <Input
              label="Confirm Password"
              name="password"
              pattern=".{6,}"
              title="Must be at least 6 characters."
              type="password"
            />

            <div className="form-item">
              <button type="submit" onClick={this.validateMatch}>SUBMIT</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Form.PropTypes = {
  formTitle: PropTypes.string
};

export default Form;