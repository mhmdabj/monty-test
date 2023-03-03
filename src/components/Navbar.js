import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import "../theme/navbar.css";

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.openNav = this.openNav.bind(this);
    }

    openNav() {
        document.getElementById("mySidenav").style.width = "250px";
    }

    closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }

    render() {
        return (
            <>
                <div id="mySidenav" className="sidenav">
                    <ul className="navbar-nav mr-auto">
                        <a href="#!" className="closebtn" onClick={this.closeNav}>&times;</a>
                        <li><NavLink to={'/'}
                                     className={({isActive}) => (isActive ? "active-link" : 'non-active-link')}> Dashboard </NavLink>
                        </li>
                        <li><NavLink to={'/table'}
                                     className={({isActive}) => (isActive ? "active-link" : 'non-active-link')}>Table</NavLink>
                        </li>
                        <li><NavLink to={'/dragdrop'}
                                     className={({isActive}) => (isActive ? "active-link" : 'non-active-link')}>DragDrop</NavLink>
                        </li>
                        <li><NavLink to={'/profile'}
                                     className={({isActive}) => (isActive ? "active-link" : 'non-active-link')}>Profile</NavLink>
                        </li>
                    </ul>
                </div>
                <span className="menu-logo px-3" onClick={this.openNav}>&#9776;</span>
            </>
        );
    }
}

export default Navbar;