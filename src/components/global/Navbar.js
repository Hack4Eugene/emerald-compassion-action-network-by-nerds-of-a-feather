import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../static/imgs/ecan_logo.png';

import './styles.scss';

class Navbar extends Component {
    render() {
        return (

            <nav className="navbar navbar-expand-lg navbar-white border-bottom mb-4">
                  <div className="navbar-brand"><img src={logo} alt="ECAN Logo" width="150" height="150" className="d-inline-block float-left"/></div>
                  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <button type="button" className="btn btn-light mr-4"><Link className="text-success" to="/">Projects</Link></button>
                            <button type="button" className="btn btn-light mr-4"><Link className="text-success" to="/events">Events</Link></button>
                            <button type="button" className="btn btn-light mr-4"><Link className="text-success" to="/explore">Explore</Link></button>
                            <button type="button" className="btn btn-light mr-4"><Link className="text-success" to="/profile">Profile</Link></button>
                        </div>
                  </div>
                  <Link className="text-success" to="/adduser"><button type="button" className="btn btn-outline-success btn-lg float-right mt-5 mr-0">New User</button></Link>
                  <Link className="text-primary" to="/login"><button type="button" className="btn btn-outline-primary btn-lg float-right mt-5 mr-5">Login</button></Link>
           </nav>

        )
    }
}

export default Navbar;
