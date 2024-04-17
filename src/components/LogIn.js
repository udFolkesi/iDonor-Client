import React, { Component } from 'react';
import { Layout } from './Layout';
import App from '../App';
import { Navigate, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      rememberMe: false,
      buttonPressed: false,
      shouldRedirect: false
    };
  }

  handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === 'checkbox' ? checked : value;

    this.setState({ [name]: inputValue });
  };

  handleButtonPress = async (event) => {
    event.preventDefault();
    this.setState({ buttonPressed: true });

    const { email, password, rememberMe } = this.state;
    const url = `https://localhost:7178/token?email=${email}&password=${password}`;

    try {
      // Make an authorization request to the server
      const response = await fetch(url, {
        method: 'POST', // or 'POST' depending on your server's requirements
        headers: {
          'Content-Type': 'application/json',
        },
         body: JSON.stringify({ email, password, rememberMe }), // Uncomment if you need a POST request
      });

      if (response.ok) {
        // Update the authorized variable and store it in localStorage
        console.log('success');
        LogIn.authorized = true;
        App.authorized = true;
        const data = await response.json();
        const accessToken = data.access_token;
        localStorage.setItem('token', accessToken)
        localStorage.setItem('authorized', true);
        const decodedToken = jwtDecode(accessToken);
        localStorage.setItem('role', decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
        localStorage.setItem('userId', decodedToken.sub);
        //window.location.reload();
        //this.setState({ shouldRedirect: true });
        // Use useHistory to navigate to "/data"
              // Refresh the page
        //window.location.reload();

        // Use setTimeout to delay the redirection after 2 seconds
          // Use useHistory to navigate to "/data"
          //const navigate = useNavigate()
          //this.props.navigation.navigate('/data')
          this.setState({ shouldRedirect: true });
          if (localStorage.getItem('role') == 'Admin') {
            window.location.href = "/data";
          }
          else {
            window.location.href = "/donations";
          }
        //Layout.refreshComp();
      } else {
        // Handle authentication error
        console.error('Authentication failed');
      }
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  };

  render() {
    const { shouldRedirect } = this.state;

    if (shouldRedirect) {
      //return <Navigate to="/data" refresh={"true"}/>;
    }

    return (
      <form>
        <h3>Log In</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            name="email"
            value={this.state.email}  // Add this line
            onChange={this.handleInputChange}  // Add this line
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            name="password"
            value={this.state.password}  // Add this line
            onChange={this.handleInputChange}  // Add this line
          />
        </div>
        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>
        <div className="d-grid">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.handleButtonPress}
          >
            Log In
          </button>
        </div>
      </form>
    );
  }
}