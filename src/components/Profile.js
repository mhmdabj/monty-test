import React, {Component} from 'react';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBDropdown,
    MDBDropdownItem,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBInput,
    MDBRow
} from 'mdb-react-ui-kit';

import {toast, ToastContainer} from 'react-toastify';
import axios from "axios";
import Export from "../utils/export-json";

class Profile extends Component {
    constructor(props) {
        super(props);

        let KeyName = JSON.parse(window.localStorage.getItem('auth_token'));
        this.state = {
            KeyName: KeyName,
            email: Object.values(KeyName)[0],
            password: Object.values(KeyName)[1],
            confirmPassword: Object.values(KeyName)[1],
            passwordError: false,
            roles: [],
            selectedRole: Object.values(KeyName)[2],
            isOpen: false,
        };
    }

    componentDidMount() {
        axios.get('/data/users-data.json')
            .then((response) => {
                const roles = response.data.users.reduce((acc, user) => {
                    if (!acc.includes(user.role)) {
                        acc.push(user.role);
                    }
                    return acc;
                }, []);
                this.setState({roles: roles});
            })
            .catch((error) => {
                console.error(error);
            });
        document.getElementById("mySidenav").style.width = "0";

    }

    handleToggle = (event) => {
        event.preventDefault(); // Prevent the default behavior of the <a> tag
        this.setState({isOpen: !this.state.isOpen});
    }
    handleRoleChange = (role) => {
        this.setState({selectedRole: role});
    }
    handlePasswordChange = (event) => {
        this.setState({password: event.target.value});
    }

    handleConfirmPasswordChange = (event) => {
        this.setState({confirmPassword: event.target.value});
    }

    handleSave = () => {
        const {selectedRole, password, confirmPassword, email} = this.state;

        // Validate that the password and confirm password match
        if (password !== confirmPassword) {
            toast.error("Passwords doesn't match :/")
            this.setState({passwordError: true});
            return;
        } else {
            this.setState({passwordError: false});
        }

        const user_info = {email: email, password: password, role: selectedRole};
        toast.success("Successfully updated the user in local storage :)")
        localStorage.setItem('auth_token', JSON.stringify(user_info));

        // Update the user's role and password in the JSON file
        axios.get('/data/users-data.json')
            .then((response) => {
                const users = response.data.users.map((user) => {
                    if (user.email === email) {
                        return {...user, role: selectedRole, password: password};
                    } else {
                        return user;
                    }
                });
                const updatedData = {users: users};
                Export(updatedData);
            })
            .catch((error) => {
                console.error('Error fetching users from JSON file:', error);
            });


    }

    render() {
        const {roles, selectedRole, password, confirmPassword, passwordError} = this.state;
        return (
            <div>
                <ToastContainer/>
                <MDBRow tag="form" className='justify-content-center'>
                    <MDBCol md='6'>
                        <MDBCard>
                            <MDBCardBody className='p-4'>
                                <div className='d-flex flex-column align-items-center text-center'>
                                    <img src='https://mdbootstrap.com/img/Photos/Avatars/img%20(32).jpg' alt='avatar'
                                         className='rounded-circle' width='150'/>
                                    <div className='mt-3'>
                                        <h4>John Doe</h4>
                                        <p className='text-muted mb-0'>Web Developer</p>
                                        <p className='text-muted'>2+ years experience</p>
                                    </div>
                                </div>
                                <hr className='my-4'/>
                                <div className='d-flex flex-column'>
                                    <div className='d-flex justify-content-between mb-3 align-items-center'>
                                        <h6 className='mb-0'>Email</h6>
                                        <span className='text-secondary'>{this.state.email}</span>
                                    </div>
                                    <div className='d-flex justify-content-between mb-3 align-items-center'>
                                        <h6 className='mb-0'>Phone</h6>
                                        <span className='text-secondary'>(555) 555-5555</span>
                                    </div>
                                    <div className='d-flex justify-content-between mb-3 align-items-center'>
                                        <h6 className='mb-0'>Role</h6>
                                        <MDBDropdown>
                                            <MDBDropdownToggle color="info" onClick={this.handleToggle}>
                                                {selectedRole ? selectedRole : 'Select a role'}
                                            </MDBDropdownToggle>
                                            <MDBDropdownMenu>
                                                {roles.map((role) => (
                                                    <MDBDropdownItem
                                                        link
                                                        key={role}
                                                        onClick={() => this.handleRoleChange(role)}
                                                    >
                                                        {role}
                                                    </MDBDropdownItem>
                                                ))}
                                            </MDBDropdownMenu>
                                        </MDBDropdown>
                                    </div>
                                    <div className='d-flex justify-content-between mb-3 align-items-center'>
                                        <h6 className='mb-0'>Password</h6>
                                        <MDBInput type='password' onChange={this.handlePasswordChange}
                                                  value={password}/>
                                    </div>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <h6 className='mb-0'>Confirm Password</h6>
                                        <MDBInput type='password' onChange={this.handleConfirmPasswordChange}
                                                  value={confirmPassword} error={passwordError.toString()}/>
                                    </div>
                                </div>
                                <hr className='my-4'/>
                                <div className='d-flex justify-content-center'>
                                    <MDBBtn color='primary' onClick={this.handleSave}>Edit Profile</MDBBtn>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </div>
        );
    }

}

export default Profile;