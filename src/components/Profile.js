import React, { Component, useRef } from 'react';
import { Layout } from './Layout';
import App from '../App';
import { jwtDecode } from 'jwt-decode';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: {},
            formData: {
                // initialize form fields with default values
                // You can update these with the actual field names and default values
                username: '',
                name: '',
                surname: '',
                patronymic: '',
                role: '',
                email: '',
                address: '',
                phone: '',
                gender: '',
                birthday: '',
                blood: '',
                rhesus: '',
                operationsDonor: '',
                operationsPatient: ''
                // ...
            }
        };

        this.updateProfile = this.updateProfile.bind(this);
    }

    componentDidMount() {
        // Fetch initial data using a GET request
        fetch(`https://localhost:7178/api/Users/GetUser/${Number(localStorage.getItem('userId'))}`)
            .then(response => response.json())
            .then(data => {
              // Update formData with the fetched data
              this.setState({
                  userData: data,
                  formData: {
                    username: data.username,
                    name: data.name,
                    surname: data.surname,
                    patronymic: data.patronymic,
                    role: data.role,
                    email: data.email,
                    address: data.client ? data.client.address : 'null',
                    phone: data.client ? data.client.phoneNumber : 'null',
                    gender: data.client ? data.client.gender : 'null',
                    birthday: data.client ? data.client.dateOfBirth : 'null',
                    passport: data.client ? data.client.passportNumber : 'null',
                    blood: data.client ? data.client.blood.bloodGroup : 'null',
                    rhesus: data.client ? data.client.blood.rhesusFactor : 'null',
                    operationsDonor: data.client ? data.client.donationsAsDonor : 'null',
                    operationsPatient: data.client ? data.client.donationsAsPatient : 'null'
                  }
              });
          })
            .catch(error => console.error('Error fetching data:', error));
    }

    handleInputChange = (e) => {
        // Update form data in the state as the user types
        const { name, value } = e.target;
        this.setState(prevState => ({
            formData: {
                ...prevState.formData,
                [name]: value,
            }
        }));
    }

    handleFormSubmit = (e) => {
        e.preventDefault();

        // // Send updated data using a POST request
        // fetch('YOUR_POST_API_ENDPOINT', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(this.state.formData),
        // })
        // .then(response => response.json())
        // .then(updatedData => {
        //     console.log('Data updated successfully:', updatedData);
        //     // Optionally, update state with the new data
        //     this.setState({ userData: updatedData });
        // })
        // .catch(error => console.error('Error updating data:', error));
    }

    updateProfile() {
        console.log(this.state.formData);
        const selectedFormData = {
            userID: this.userId,
            username: this.state.formData.username,
            name: this.state.formData.name,
            surname: this.state.formData.surname,
            patronymic: this.state.formData.patronymic,
            role: this.state.formData.role,
            email: this.state.formData.email
        };
        console.log(selectedFormData);

        fetch(`https://localhost:7178/api/Users/UpdateUser/${this.userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(selectedFormData),
        })
        .then(response => response.json())
        .then(updatedData => {
            console.log('Data updated successfully:', updatedData);
            // Optionally, update state with the new data
            this.setState({ userData: updatedData });
        })
        .catch(error => console.error('Error updating data:', error));
    }

    async deleteProfile() {
        try {
            // Make a DELETE request to your server endpoint
            const response = await fetch(`https://localhost:7178/api/Users/DeleteUser/${this.userId}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                // Add any other headers as needed
              },
            });
      
            if (!response.ok) {
              throw new Error(`Failed to delete resource with ID ${this.userId}`);
            }
      
          } catch (error) {
            console.error('Error deleting resource:', error);
          }
    }

    render() {
        const { userData, formData } = this.state;
        // const ref = useRef(null);
        // const isFocused = useFocus(ref);

        const inputStyle = {
          position: 'absolute', left: '320px',
          outline: 0,
          backgroundColor: '#F1F1F1',
        };

        let role = localStorage.getItem('role');
        if(localStorage.getItem('authorized') == 'true') {
            // const decodedToken = jwtDecode(localStorage.getItem('token'));
            // role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            // this.userId = decodedToken.sub;
        }

        return (
          <div>
              <h3>Your Profile</h3>
              <form onSubmit={this.handleFormSubmit}>
                  {/* Render your form fields based on the data */}
                  <div>
                      <label>
                          Username
                          <input
                            className='border-top-0 border-left-0 border-right-0'
                            style={inputStyle}
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={this.handleInputChange}
                          />
                      </label>
                  </div>
                  <div className='mt-1'>
                      <label>
                          Name
                          <input
                            className='border-top-0 border-left-0 border-right-0'
                            style={inputStyle}
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={this.handleInputChange}
                          />
                      </label>
                  </div>
                  <div className='mt-1'>
                      <label>
                          Surname
                          <input
                            className='border-top-0 border-left-0 border-right-0'
                            style={inputStyle}
                            type="text"
                            name="surname"
                            value={formData.surname}
                            onChange={this.handleInputChange}
                          />
                      </label>
                  </div>
                  <div  className='mt-1'>
                      <label>
                          Patronymic
                          <input
                            className='border-top-0 border-left-0 border-right-0'
                            style={inputStyle}
                            type="text"
                            name="patronymic"
                            value={formData.patronymic}
                            onChange={this.handleInputChange}
                          />
                      </label>
                  </div>
                  <div className='mt-1'>
                      <label>
                          Role
                          <input
                            className='border-top-0 border-left-0 border-right-0'
                            style={inputStyle}
                            type="text"
                            name="role"
                            value={formData.role}
                            onChange={this.handleInputChange}
                          />
                      </label>
                  </div>
                  <div className='mt-1'>
                      <label>
                          Email
                          <input
                            className='border-top-0 border-left-0 border-right-0'
                            style={inputStyle}
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={this.handleInputChange}
                          />
                      </label>
                  </div>
                  {role != "Admin" ? (
                    <div>
                      <div className='mt-1'>
                        <label>
                            Address
                            <input
                              className='border-top-0 border-left-0 border-right-0'
                              style={inputStyle}
                              type="text"
                              name="address"
                              value={formData.address}
                              onChange={this.handleInputChange}
                            />
                        </label>
                    </div>
                    <div className='mt-1'>
                        <label>
                            Phone
                            <input
                              className='border-top-0 border-left-0 border-right-0'
                              style={inputStyle}
                              type="text"
                              name="phone"
                              value={formData.phone}
                              onChange={this.handleInputChange}
                            />
                        </label>
                    </div>
                    <div className='mt-1'>
                        <label>
                            Gender
                            <input
                              className='border-top-0 border-left-0 border-right-0'
                              style={inputStyle}
                              readonly="readonly"
                              type="text"
                              name="gender"
                              value={formData.gender}
                              onChange={this.handleInputChange}
                            />
                        </label>
                    </div>
                    <div className='mt-1'>
                        <label>
                            Birthday
                            <input
                              className='border-top-0 border-left-0 border-right-0'
                              style={inputStyle}
                              type="text"
                              name="birthday"
                              value={formData.birthday}
                              onChange={this.handleInputChange}
                            />
                        </label>
                    </div>
                    <div className='mt-1'>
                        <label>
                            Passport
                            <input
                              className='border-top-0 border-left-0 border-right-0'
                              style={inputStyle}
                              type="text"
                              name="passport"
                              value={formData.passport}
                              onChange={this.handleInputChange}
                            />
                        </label>
                    </div>
                    </div>
                  ) : null}
                  
                  {/* Add more fields as needed */}
                  <div>
                      <button type="submit" className='btn btn-primary mr-3 mt-3' onClick={this.updateProfile}>Update Profile</button>
                      <button type='button' className='btn btn-outline-danger mt-3' onClick={this.deleteProfile}>Delete Account</button>
                  </div>
              </form>
              {role != "Admin" && (
                <div style={{position: 'absolute', top: '72px', left: '700px'}}>
                <h3>Blood</h3>
                <p>Blood Group:  {formData.blood}</p>
                <p>Rhesus Factor:  {formData.rhesus}</p>
              </div>
              )}

              {role != "Admin" && (
                <div style={{position: 'absolute', top: '190px', left: '700px', maxWidth: '500px' }}>
                <h3>Operations</h3>
                <table className="table table-striped" style={{ fontSize: '14px' }}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Collecting</th>
                        <th>Volume</th>
                        <th>Transfusion</th>
                        <th>Expiration</th>
                        <th>Bank</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                      <tbody>
                      {Object.values(formData.operationsDonor).map((donation, index) => (
                          <tr key={index}>
                          <td>{donation.donationOperationID}</td>
                          <td>{donation.collectionTime}</td>
                          <td>{donation.volume}</td>
                          <td>{donation.transfusionTime}</td>
                          <td>{donation.expiryTime}</td>
                          <td>{donation.bloodBank.name}</td>
                          <td>{donation.status}</td>
                          </tr>
                      ))}
                      </tbody>
                </table>
              </div>
                )}
          </div>
      );
    }
}
