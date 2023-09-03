import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import UserForm from './UserForm';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    // Your authentication logic goes here

    this.setState({
      username: '',
      password: '',
    });
  }

  render() {
    const { username, password } = this.state;

    return (
      <Router>
        <div>
          <h2>Sign In</h2>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div>
              <button type="submit">Sign In</button>
            </div>
          </form>
          <div>
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
          </div>
        </div>
        
        {/* Define the route for UserForm */}
        <Route path="/signup" component={UserForm} />
      </Router>
    );
  }
}

export default Login;
