import React from 'react';
import Input from './Input';
import Select from './Select';

class Form extends React.Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {};
  //   this.handleChange = this.handleChange.bind(this);
  //   this.validateMatch = this.validateMatch.bind(this);
  //   this.validateLength = this.validateLength.bind(this);
  // }

  state = {
    // variables did not exist in state before but was declared
    confirmEmail: false,
    email: null,
    emailValidation: null,
  }


  handleChange = (event) => {
    let state = Object.assign({}, this.state);

    state[event.target.name] = event.target.value;

    let currentEvent = event.target.name;
    this.setState(state, () => {
      currentEvent === 'confirmEmail' && this.validateLength(event);
    });

  }

  validateMatch = (event) => {
    event.preventDefault();
    const email = this.state.email;
    const confirmEmail = this.state.confirmEmail;

    if(email !== confirmEmail) {
      event.preventDefault();
      alert('email doesn\'t match');
    }
  }

  validateLength= (event) => {
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
          <form>
            <label className="contact-label">
              First Name:
            </label>
            <Input
              name="firstName"
              placeholder="First Name"
              type="text"
            /><br />
            <label className="contact-label">
              Middle Initial:
            </label>
            <Input
              name="middleInitial"
              maxlength="1"
              placeholder="Middle Initial"
              type="text"
            /><br />
            <label className="contact-label">
              Last Name:
            </label>
            <Input
              name="lastName"
              placeholder="Last Name"
              type="text"
            /><br />
            <label className="contact-label">
              Address
            </label>
            <Input
              name="address"
              placeholder="Address"
              type="text"
            /><br />
            <label className="contact-label">
              Account Type:
            </label>
            <Select name="accountType"/><br />
            <label className="contact-label">
              Email:
            </label>
            <Input
              name="email"
              placeholder="Email"
              type="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
              onChange={this.handleChange}
            /><br />
            <label className="contact-label">
              Confirm Email
            </label>
            <Input
              name="confirmEmail"
              placeholder="Confirm Email"
              type="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
              onChange={this.handleChange}
              className={isValidated}
            /><br />
            <label className="contact-label">
              Password:
            </label>
            <Input
              name="password"
              placeholder="Password"
              type="password"
              pattern=".{6,}"
              title="Must be at least 6 characters."
            /><br />
            <label className="contact-label">
              Confirm Password
            </label>
            <Input
              placeholder="Confirm Password"
              type="password"
              pattern=".{6,}"
              title="Must be at least 6 characters"
            /><br />
            <button type="submit" onClick={this.validateMatch}>SUBMIT</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Form;