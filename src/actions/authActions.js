import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from './types';

// Register User
export const registerUser = (userData, navigate) => (dispatch) => {
    dispatch({ type: GET_ERRORS, payload: {} }); // remove old errors before trying to register
    dispatch(setUserLoading(true));
    axios
        .post('api/users/register', userData)
        .then((res) => {
            navigate('/login');
            dispatch(setUserLoading(false));
        }) // re-direct to login on successful register
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
            dispatch(setUserLoading(false));
        });
};

// Login - get user token
export const loginUser = (userData) => (dispatch) => {
    dispatch({ type: GET_ERRORS, payload: {} }); // remove old errors before trying to login
    dispatch(setUserLoading(true));
    axios
        .post('api/users/login', userData)
        .then((res) => {
            // Save to localStorage// Set token to localStorage
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
            dispatch(setUserLoading(false));
        });
};

// Set logged in user
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

// User loading
export const setUserLoading = (isLoading) => {
    return {
        type: USER_LOADING,
        payload: isLoading
    };
};

// Log user out
export const logoutUser = () => (dispatch) => {
    // Remove token from local storage
    localStorage.removeItem('jwtToken');
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
};
