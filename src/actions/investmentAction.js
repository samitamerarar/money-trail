import axios from 'axios';
import { ADD_INVESTMENT, GET_INVESTMENTS, INVESTMENTS_LOADING, DELETE_INVESTMENT, GET_ERRORS } from './types';

// Add investment
export const addInvestment = (data) => (dispatch) => {
    dispatch(setInvestmentsLoading());
    axios
        .post('api/investments/add', data)
        .then((res) =>
            dispatch({
                type: ADD_INVESTMENT,
                payload: res.data
            })
        )
        .catch((err) =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Delete investment
export const deleteInvestment = (data) => (dispatch) => {
    dispatch(setInvestmentsLoading());
    const id = data.id;
    axios
        .delete(`api/investments/${id}`)
        .then((res) =>
            dispatch({
                type: DELETE_INVESTMENT,
                payload: id
            })
        )
        .catch((err) =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Get all investments for the user
export const getInvestments = () => {
    return async (dispatch) => {
        dispatch(setInvestmentsLoading());
        const response = await axios
            .get('api/investments')
            .then((res) =>
                dispatch({
                    type: GET_INVESTMENTS,
                    payload: res.data
                })
            )
            .catch((err) =>
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            );

        return response;
    };
};

// Investments loading
export const setInvestmentsLoading = () => {
    return {
        type: INVESTMENTS_LOADING
    };
};
