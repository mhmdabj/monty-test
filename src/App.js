import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import DragDrop from './components/DragDrop';
import Table from './components/Table';
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import {MDBBtn} from "mdb-react-ui-kit";

class App extends Component {
    render() {
        const loggedInUser = localStorage.getItem("auth_token");
        if (!loggedInUser) {
            return (<Login/>);
        } else {
            return (
                <Router>
                    <div>
                        <div className="my-2 d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center">
                                <Navbar/>
                                <h2 className="line-1 anim-typewriter text-danger m-0">Welcome to Monty Mobile Test</h2>
                            </div>
                            <MDBBtn onClick={() => {
                                localStorage.removeItem('auth_token');
                                window.location.replace('/');
                            }}
                                    className='mx-2' color='danger'>
                                Logout
                            </MDBBtn>
                        </div>
                        <Routes>
                            <Route exact path='/' element={<Dashboard/>}/>
                            <Route path='/table' element={<Table/>}/>
                            <Route path='/dragdrop' element={<DragDrop/>}/>
                            <Route path='/profile' element={<Profile/>}/>
                        </Routes>
                    </div>
                </Router>
            );
        }
    }
}

export default App;