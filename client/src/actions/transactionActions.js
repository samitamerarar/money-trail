import axios from 'axios';
import { ADD_TRANSACTION, DELETE_TRANSACTION, GET_TRANSACTIONS, TRANSACTIONS_LOADING } from './types';

// Add transaction
export const addTransaction = (data) => (dispatch) => {
    axios
        .post('api/transactions/add', data)
        .then((res) =>
            dispatch({
                type: ADD_TRANSACTION,
                payload: res.data
            })
        )
        .catch((err) => console.log(err));
};

// Modify transaction
export const editTransaction = (data) => (dispatch) => {
    axios
        .post('api/transactions/edit', data)
        .then((res) =>
            dispatch({
                type: ADD_TRANSACTION,
                payload: res.data
            })
        )
        .catch((err) => console.log(err));
};

// Delete transaction
export const deleteTransaction = (txnData) => (dispatch) => {
    const id = txnData;
    axios
        .delete(`api/transactions/${id}`)
        .then((res) =>
            dispatch({
                type: DELETE_TRANSACTION,
                payload: id
            })
        )
        .catch((err) => console.log(err));
};

// Get all transactions
export const getTransactions = () => (dispatch) => {
    dispatch(setTransactionsLoading());
    axios
        .get('api/transactions', {})
        .then((res) =>
            dispatch({
                type: GET_TRANSACTIONS,
                payload: res.data
            })
        )
        .catch((err) =>
            dispatch({
                type: GET_TRANSACTIONS,
                payload: null
            })
        );
};

// Transactions loading
export const setTransactionsLoading = () => {
    return {
        type: TRANSACTIONS_LOADING
    };
};
