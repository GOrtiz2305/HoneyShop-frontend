import React, { Component } from 'react'
import { URL } from "../../config";
import axios from 'axios';

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    return JSON.parse(jsonPayload);
}

class ProfileForm extends Component {

    state = {
        names: '',
        last_names: '',
        address: '',
        phone: '',
        error: {}
    }

    componentDidMount() {
        this.fetchUserData(); // Fetch user data on component mount
    }

    fetchUserData = async () => {
        this.setState({ isLoading: true }); // Set loading state to true

        let user_id = parseJwt(localStorage.getItem('token'));
        //console.log(parseJwt(localStorage.getItem('token')));

        try {
            const response = await axios.get(URL + 'clients/user/15'); // Fetch user data
            const userData = response.data; // Access user data from response

            this.setState({
                names: userData.names,
                last_names: userData.last_names,
                address: userData.address,
                phone: userData.phone,
            });

            console.log("Info" + userData);
        } catch (error) {
            console.error('Error fetching user data:', error);
            // Handle errors appropriately, e.g., display an error message
        } finally {
            this.setState({ isLoading: false }); // Set loading state to false
        }
    };

    changeHandler = (e) => {
        const error = this.state.error;
        error[e.target.name] = ''

        this.setState({
            [e.target.name]: e.target.value,
            error
        })
    }

    subimtHandler = (e) => {
        e.preventDefault();

        const { names,
            last_names,
            address,
            phone,
            error } = this.state;

        if (names === '') {
            error.names = "Please enter your name";
        }
        if (last_names === '') {
            error.last_names = "Please enter your last names";
        }
        if (address === '') {
            error.address = "Please enter your address";
        }
        if (phone === '') {
            error.phone = "Select your phone";
        }

        if (error) {
            this.setState({
                error
            })
        }
        if (error.names === '' && error.last_names === '' && error.address === '' && error.phone === '') {
            this.setState({
                names: '',
                last_names: '',
                address: '',
                phone: '',
                error: {}
            })
        }
    }

    render() {
        const { names,
            last_names,
            address,
            phone,
            error } = this.state;

        return (
            <form onSubmit={this.subimtHandler} className="form">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-12">
                        <div className="form-field">
                            <input value={names} onChange={this.changeHandler} type="text" name="names" placeholder="Names" />
                            <p>{error.names ? error.names : ''}</p>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                        <div className="form-field">
                            <input value={last_names} onChange={this.changeHandler} type="text" name="last_names" placeholder="Last names" />
                            <p>{error.last_names ? error.last_names : ''}</p>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                        <div className="form-field">
                            <input onChange={this.changeHandler} value={address} type="text" name="address" placeholder="Address" />
                            <p>{error.address ? error.address : ''}</p>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                        <div className="form-field">
                            <input onChange={this.changeHandler} value={phone} type="text" name="phone" placeholder="Phone" />
                            <p>{error.phone ? error.phone : ''}</p>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="form-submit">
                            <button type="submit" className="theme-btn">Update profile</button>
                        </div>
                    </div>
                </div>
            </form>
        )
    }

}
export default ProfileForm;