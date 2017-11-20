import React from 'react';
import Input from './Input';
import Select from './Select';

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
    return (
      <div>
        <div className="contact">
          <form id="registration">
            <div className="form-item">
              <span className="contact-label">First Name</span>
              <Input
                name="firstName"
                type="text"
              />
            </div>

            <div className="form-item">
              <span className="contact-label">Middle Initial</span>
              <Input
                name="middleInitial"
                maxLength={1}
                type="text"
              />
            </div>

            <div className="form-item">
              <span className="contact-label">Last Name</span>
              <Input
                name="lastName"
                type="text"
              />
            </div>

            <div className="form-item">
              <span className="contact-label">Address</span>
              <Input
                name="address"
                type="text"
              />
            </div>

            <div className="form-item">
              <span className="contact-label">City</span>
              <Input
                name="city"
                type="text"
              />
            </div>

            <div className="form-item">
              <span className="contact-label">State</span>
              <Select form="registration" menuType="states" name="states"/>
            </div>

            <div className="form-item">
              <span className="contact-label">Account Type</span>
              <Select form="registration" menuType="accountTypes" name="accountTypes"/>
            </div>

            <div className="form-item">
              <span className="contact-label">Email</span>
              <Input
                name="email"
                type="email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
                onChange={this.handleChange}
              />
            </div>

            <div className="form-item">
              <span className="contact-label">Confirm Email</span>
              <Input
                name="confirmEmail"
                type="email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
                onChange={this.handleChange}
                className={isValidated}
              />
            </div>

            <div className="form-item">
              <span className="contact-label">Password:</span>
              <Input
                name="password"
                type="password"
                pattern=".{6,}"
                title="Must be at least 6 characters."
              />
            </div>

            <div className="form-item">
              <span className="contact-label">Confirm Password</span>
              <Input
                type="password"
                pattern=".{6,}"
                title="Must be at least 6 characters"
              />
            </div>

            <div className="form-item">
              <button type="submit" onClick={this.validateMatch}>SUBMIT</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Form;