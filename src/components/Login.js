import React, {Component} from 'react';
import {MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBInput, MDBRow} from 'mdb-react-ui-kit';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "", password: "",
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        event.preventDefault();
        const target = event.target;
        this.setState({
            [target.name]: target.value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.get("/data/users-data.json")
            .then(res => {
                for (let i = 0; i < res.data.users.length; i++) {
                    if (this.state.email === res.data.users[i].email && this.state.password === res.data.users[i].password) {
                        localStorage.setItem('auth_token', JSON.stringify(res.data.users[i]));
                        window.location.reload(false);
                        break;
                    } else {
                        toast.error("Wrong Credentials :/")
                        break;
                    }
                }
            })
    }

    render() {
        return (
            <>
                <ToastContainer/>
                <MDBRow tag="form" className='p-5 my-5 d-flex flex-column align-items-center'
                        onSubmit={this.handleSubmit}>
                    <MDBCard className='bg-dark  text-white my-5 mx-auto'
                             style={{borderRadius: '1rem', maxWidth: '400px'}}>
                        <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

                            <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                            <p className="text-white-50 mb-5">Please enter your email and password!</p>
                            <MDBCol md="12">
                                <MDBInput
                                    className='mb-4'
                                    labelClass='text-white'
                                    value={this.state.email}
                                    name='email'
                                    type="email"
                                    style={{color: "white"}}
                                    onChange={this.handleInputChange}
                                    id='formControlLg'
                                    label='Email'
                                    required
                                />
                            </MDBCol>
                            <MDBCol md="12">
                                <MDBInput
                                    className='mb-4'
                                    labelClass='text-white'
                                    value={this.state.password}
                                    name='password'
                                    type='password'
                                    style={{color: "white"}}
                                    onChange={this.handleInputChange}
                                    id='formControlLg'
                                    label='Password'
                                    required
                                />
                            </MDBCol>
                            <MDBBtn className="mb-4 px-5 mx-5 w-100" color='danger' size='lg'>Login</MDBBtn>
                        </MDBCardBody>
                    </MDBCard>
                </MDBRow>
            </>
        );
    }
}

export default Login;