import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux'

import { logout } from '../redux/actions/auth'

class Header extends Component {
    onMouseDown = () => this.props.dispatch(logout())
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">React-Node App</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div id="navbarNavDropdown" className="navbar-collapse collapse">
                    <ul className="navbar-nav mr-auto">
                        { this.props.isAuthenticated && <li className="nav-item">
                            <Link className="nav-link" to="/profile">Profile</Link>
                        </li>}
                    </ul>
                    <ul className="navbar-nav">
                        { this.props.isAuthenticated && <li className="nav-item dropdown">
                            <a onMouseDown={this.onMouseDown} className="nav-link " href="#">
                                Logout
                            </a>
                        </li>}
                        { !this.props.isAuthenticated && <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>}
                        { !this.props.isAuthenticated && <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>}
                    </ul>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = state => ({
    auth : state.auth,
    isAuthenticated : state.auth.loggedIn,
    app : state.app
});
export default withRouter(connect(mapStateToProps, null)(Header))