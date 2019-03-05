import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Spinner from '../component/Spinner'
import { handleLogIn } from '../redux/actions/auth'

class Login extends Component {
    state = {
        email: '',
        password: '',
        isLoading: false,
        messageType: '',
        messageText: ''
    }

    onSubmit = async e => {
        e.preventDefault()
        if(this.state.email && this.state.password){
            this.setState({ isLoading: true, messageType: '', messageText: '' })
            const credentials = JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            })
            this.props.dispatch(handleLogIn(credentials, response => {
                this.setState({ isLoading: false })
                if(!response.success){
                    this.setState({ messageText: response.message, messageType: response.success ? 'success' : 'danger' })
                }else{
                    this.props.history.push('/profile')
                }
            }))
        }else{
            alert('All fields required')
        }
    }

    render() {
        return (
            <div className='jus'>
                { this.state.isLoading && <Spinner /> }
                <div className='container'>
                    <div className={`alert ${this.state.messageType === 'danger' ? 'alert-danger' : 'alert-success'} alert-dismissible fade ${this.state.messageText ? 'show' : ''}`}>
                        <p>{ this.state.messageText }</p>
                    </div>
                </div>
                <form onSubmit={this.onSubmit} className='col-md-4'>
                    <h1>Login</h1>
                    <div className="form-group">
                        <label htmlFor="email">Email address:</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="email" 
                            name='email'
                            value={this.state.email}
                            onChange={e => this.setState({ [e.target.name]: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pwd">Password:</label>
                        <input 
                            onChange={e => this.setState({ [e.target.name]: e.target.value })} 
                            type="password"
                            name='password' 
                            value={this.state.password}
                            className="form-control" id="pwd" 
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth : state.auth,
    isAuthenticated : state.auth.loggedIn,
    app : state.app
});

export default withRouter(connect(mapStateToProps, null)(Login))