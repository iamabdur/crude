// src/components/UserForm.js
import React, { Component } from 'react';
import axios from 'axios';
import './UserForm.css'

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      name: '',
      email: '',
      phone: '',
      password: '',
      id: '',
      isEditMode: false,
      passwordVisible: false,
    };

  }
  togglePasswordVisibility = () => {
    this.setState((prevState) => ({
      passwordVisible: !prevState.passwordVisible,
    }));
  };

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    try {
      const response = await axios.get(
        'https://64f2f2f4edfa0459f6c62682.mockapi.io/users'
      );
      this.setState({ users: response.data });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { name, email, phone, password, id, isEditMode } = this.state;
    const userData = { name, email, phone, password };

    try {
      if (isEditMode) {
        await axios.put(
          `https://64f2f2f4edfa0459f6c62682.mockapi.io/users/${id}`,
          userData
        );
      } else {
        await axios.post(
          'https://64f2f2f4edfa0459f6c62682.mockapi.io/users',
          userData
        );
      }

      this.fetchUsers();
      this.clearForm();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  handleEdit = (user) => {
    this.setState({
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: user.password,
      id: user.id,
      isEditMode: true,
    });
  };

  handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://64f2f2f4edfa0459f6c62682.mockapi.io/users/${id}`
      );
      this.fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  clearForm = () => {
    this.setState({
      name: '',
      email: '',
      phone: '',
      password: '',
      id: '',
      isEditMode: false,
    });
  };

  render() {
    const { users, name, email, phone, password, isEditMode } = this.state;
    const { passwordVisible, setpassword } = this.state;

    return (
      <div>
        <h2>User Form</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={this.handleInputChange}
            required
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={this.handleInputChange}
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            name="phone"
            value={phone}
            onChange={this.handleInputChange}
            required
          />
          <input
             type={passwordVisible ? 'text' : 'password'}
            placeholder="Password"
            name="password"
            value={password}
            onChange={this.handleInputChange}
            required
          />
         <button
              type="button"
              onClick={this.togglePasswordVisibility}
              className="password-toggle-button"
            >
              {passwordVisible ? 'Hide' : 'Show'}
            </button>
          <button type="submit">{isEditMode ? 'Update' : 'Add'}</button>
        </form>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Password</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.password}</td>
                <td>
                  <button onClick={() => this.handleEdit(user)}>Edit</button>
                  <button onClick={() => this.handleDelete(user.id)}>
                  Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default UserForm;