import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Spinner from '../component/Spinner'
import { handleUpdate, uploadImage } from '../redux/actions/auth'

class Profile extends Component {
    constructor(props){
        super(props)
        this.state = {
            firstName: props.auth.loggedInUser.firstName || '',
            lastName: props.auth.loggedInUser.lastName || '',
            isLoading: false,
            messageType: '',
            messageText: ''
        }
    }

    getBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
    }

    uploadImage = async e => {
        this.setState({ isLoading: true, messageType: '', messageText: '' })
        const file = e.target.files[0]

        const base64 = await this.getBase64(file)
        const formData = { image: base64 }

        this.props.dispatch(uploadImage(formData, response => {
            this.setState({ isLoading: false })
            if(response){
                this.setState({ 
                    messageText: response.message, 
                    messageType: response.success ? 'success' : 'danger' 
                })
            }
        }))
    }

    onSubmit = async e => {
        e.preventDefault()
        if(this.state.firstName || this.state.lastName){
            this.setState({ isLoading: true, messageType: '', messageText: '' })
            const credentials = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
            }
            this.props.dispatch(handleUpdate(credentials, response => {
                this.setState({ 
                    messageText: response.message, isLoading: false, 
                    messageType: response.success ? 'success' : 'danger' 
                })
            }))
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
                    <h1>Profile</h1>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name:</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="firstName" 
                            name='firstName'
                            value={this.state.firstName}
                            onChange={e => this.setState({ [e.target.name]: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name:</label>
                        <input 
                            onChange={e => this.setState({ [e.target.name]: e.target.value })} 
                            type="text"
                            name='lastName' 
                            value={this.state.lastName}
                            className="form-control" id="lastName" 
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

                <div className='col-md-6'>
                    <h1>Upload Profile Pic</h1>
                    <input onChange={this.uploadImage} type="file" name="photo" />
                    <img src={this.props.auth.loggedInUser.image} className="rounded" alt="Cinque Terre"></img>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth : state.auth,
});

export default withRouter(connect(mapStateToProps)(Profile))