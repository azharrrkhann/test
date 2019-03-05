import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from 'react-redux'

import { verify } from './redux/actions/auth'

import Header from './component/Header'
import PrivateRoute from './component/PrivateRoute';
import PublicRoute from './component/PublicRoute';

import Home from './screens/Home'
import Login from './screens/Login'
import Register from './screens/Register'
import NoMatch from './screens/NoMatch'
import Profile from './screens/Profile'

class App extends Component {
  componentDidMount(){
    this.props.dispatch(verify())
  }
  render() {
    return (
      <Router>
        <div id="app">
          <Header />
          <Switch>
            <Route exact path='/' component={Home} />
            <PublicRoute path="/login/" component={Login} />
            <PublicRoute path="/register/" component={Register} />
            <PrivateRoute exact path='/profile' component={Profile} />
            <PublicRoute exact path='**' component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default connect()(App)
