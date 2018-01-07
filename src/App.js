import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect
} from 'react-router-dom';

import './App.css';

const fakeAuth = {
    isAuthenticated: false,
    authenticated(cb) {
        this.isAuthenticated = true
        setTimeout(cb, 100)
    },
    signout(cb) {
        this.isAuthenticated = false
        setTimeout(cb, 100)
    }
}

const Public = () => <h3>Public</h3>
const Protected = () => <h3>Protected</h3>

class Login extends React.Component {
    render() {
        return (
            <div>
                LOGIN
            </div>
        )
    }
}

// testing route authentication
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        fakeAuth.isAuthenticated === true
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
)

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <ul>
                        <li><Link to='/public'>Public Page</Link></li>
                        <li><Link to='/protected'>Protected Page</Link></li>
                    </ul>

                    <Route path='/public' component={Public} />
                    <Route path='/login' component={Login} />
                    <PrivateRoute path='/protected' component={Protected} />
                </div>
            </Router>
        );
    }
}

export default App;
