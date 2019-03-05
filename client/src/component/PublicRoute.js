import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const PublicRoute = ({ component: Component, isAuthenticated, ...rest }) => {
    return (
        <Route {...rest} render={props => (
            isAuthenticated ? <Redirect to='/' /> : <Component {...props} />
        )} />
    )
}

const mapStateToProps = state => ({
    isAuthenticated : state.auth.loggedIn,
});
export default connect(mapStateToProps)(PublicRoute)
