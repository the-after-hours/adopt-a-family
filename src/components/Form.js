import React from 'react';
import Input from './Input';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.validateMatch = this.validateMatch.bind(this);
    this.validateLength = this.validateLength.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let state = Object.assign({}, this.state);

    state[event.target.name] = event.target.value;

    let currentEvent = event.target.name;
    this.setState(state, () => {
      currentEvent === 'confirmEmail' && this.validateLength(event);
    });
  }

  handleSubmit(event) {
    this.props.onSubmit(event);

    const signupData = {
      firstName: this.state.firstName,
      middleInitial: this.state.middleInitial,
      lastName: this.state.lastName,
      address: this.state.address,
      accountType: this.state.accountType,
      email: this.state.email,
      password: this.state.password,
    };

    fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify(signupData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 200) {
          console.log('successful signup');
          this.setState({
            redirectTo: './login',
          });
        } else {
          console.log(`Signup error: ${response.error}`);
          console.log(`Error message: ${response.message}`);
        }
      })
      .catch((error) => {
        console.error('Sign up server error: ', error);
      });
  }

  validateMatch(event) {
    const email = this.state.email;
    const confirmEmail = this.state.confirmEmail;

    if (email !== confirmEmail) {
      event.preventDefault();
      alert("email doesn't match");
    }
  }

  validateLength(event) {
    const email = this.state.email;
    const confirmEmail = this.state.confirmEmail;

    if (email.length !== confirmEmail.length) {
      // Add an invalidated color to the input box (red)
      this.setState({ emailValidation: false });
    } else {
      // Add a validated color to the border       (green)
      this.setState({ emailValidation: true });
    }
  }

  render() {
    let isValidated = this.state.emailValidation
      ? 'emailValid'
      : 'emailInvalid';
    return (
      <div>
        <div className="contact">
          <form onSubmit={this.handleSubmit}>
            <span className="contact-label">First Name:</span>
            <Input
              name="firstName"
              placeholder="First Name"
              type="text"
              onChange={this.handleChange}
            />
            <br />
            <span className="contact-label">Middle Initial:</span>
            <Input
              name="middleInitial"
              maxlength="1"
              placeholder="Middle Initial"
              type="text"
            />
            <br />
            <span className="contact-label">Last Name:</span>
            <Input
              name="lastName"
              placeholder="Last Name"
              type="text"
              onChange={this.handleChange}
            />
            <br />
            <span className="contact-label">Address</span>
            <Input
              name="address"
              placeholder="Address"
              type="text"
              onChange={this.handleChange}
            />
            <br />
            <span className="contact-label">Account Type:</span>
            <select name="accountType" onChange={this.handleChange}>
              <option value="donor" selected="selected">
                Donor
              </option>
              <option value="family">Family</option>
              <option value="organizer">Organizer</option>
            </select>
            <br />
            <span className="contact-label">Email:</span>
            <Input
              name="email"
              placeholder="Email"
              type="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
              onChange={this.handleChange}
            />
            <br />
            <span className="contact-label">Confirm Email</span>
            <Input
              name="confirmEmail"
              placeholder="Confirm Email"
              type="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
              onChange={this.handleChange}
              className={isValidated}
            />
            <br />
            <span className="contact-label">Password:</span>
            <Input
              name="password"
              placeholder="Password"
              type="password"
              pattern=".{6,}"
              title="Must be at least 6 characters."
              onChange={this.handleChange}
            />
            <br />
            <span className="contact-label">Confirm Password</span>
            <Input
              placeholder="Confirm Password"
              type="password"
              pattern=".{6,}"
              title="Must be at least 6 characters"
            />
            <br />
            <button type="submit" onClick={this.validateMatch}>
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Form;
