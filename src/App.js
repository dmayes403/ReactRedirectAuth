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
        console.log(this.isAuthenticated);
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
    state = {
        redirectToReferrer: false
    }
    
    login = () => {
        console.log('calling..');
        fakeAuth.authenticated(() => {
            console.log('calling again..');
            this.setState({
                redirectToReferrer: true
            })
        })
    }

    render() {
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer === true) {
            return (
                <Redirect to='/' />
            )
        }

        return (
            <div>
                <p>You must log in to view this page</p>
                <button onClick={this.login}>Log In</button>
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
