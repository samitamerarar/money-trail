import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// If authorized, return an outlet that will render child elements
// If not, return element that will navigate to login page
const PrivateRoute = ({ auth }) => (auth.isAuthenticated ? <Outlet /> : <Navigate to="/login" />);

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
