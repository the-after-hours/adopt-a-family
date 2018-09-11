import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Input from './Input';

class LogIn extends Component {
  state = {
    email: '',
    password: '',
    redirectTo: null,
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('handleSubmit');

    fetch('/user/login', {
      method: 'POST',
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((response) => {
        console.log('login response: ');
        console.log(response);
        if (response.status === 200) {
          // update the state to redirect to home
          this.setState({
            redirectTo: '/dashboard',
          });
        }
      })
      .catch((error) => {
        console.log('login error: ');
        console.log(error);
      });
  };

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <div>
          <h4>Login</h4>
          <form className="form-horizontal" onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="email">Email:</label>
              <Input
                name="email"
                title="email"
                placeholder="Email"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <Input
                name="password"
                title="password"
                placeholder="password"
                onChange={this.handleChange}
              />
            </div>
          </form>
        </div>
      );
    }
  }
}

export default LogIn;
