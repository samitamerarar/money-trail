import React, { Component } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import { Provider } from 'react-redux';
import store from './store';

import NavigationBar from './components/layout/NavigationBar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from './components/private-route/PrivateRoute';
import TransactionsContainer from './components/transactions/TransactionsContainer';
import InvestmentsContainer from './components/investments/InvestmentsContainer';
import StatisticsContainer from './components/statistics/StatisticsContainer';
import Placeholder from './components/Placeholder';

import axios from 'axios';
// Comment next line when working on localhost
//axios.defaults.baseURL = 'https://my-money-trail.herokuapp.com/';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
    // Set auth token header auth
    const token = localStorage.jwtToken;
    setAuthToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded)); // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser()); // Redirect to login
        window.location.href = './login';
    }
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router basename={process.env.PUBLIC_URL}>
                    <div className="App">
                        <div className="minimum-height">
                            <NavigationBar />
                            <Routes>
                                <Route exact path="/" element={<Landing />} />
                                <Route exact path="/register" element={<Register />} />
                                <Route exact path="/login" element={<Login />} />

                                {/* private routes below */}

                                <Route exact path="/investments" element={<PrivateRoute />}>
                                    <Route exact path="/investments" element={<InvestmentsContainer />} />
                                </Route>
                                <Route exact path="/transactions" element={<PrivateRoute />}>
                                    <Route exact path="/transactions" element={<TransactionsContainer />} />
                                </Route>
                                <Route exact path="/statistics" element={<PrivateRoute />}>
                                    <Route exact path="/statistics" element={<StatisticsContainer />} />
                                </Route>
                                <Route exact path="/settings-categories" element={<PrivateRoute />}>
                                    <Route exact path="/settings-categories" element={<Placeholder />} />
                                </Route>
                                <Route exact path="/manage" element={<PrivateRoute />}>
                                    <Route exact path="/manage" element={<Placeholder />} />
                                </Route>
                            </Routes>
                        </div>
                        <Footer />
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
