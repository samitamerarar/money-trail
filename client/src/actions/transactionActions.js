import axios from "axios";
import {
  ADD_USER_TRANSACTION,
  DELETE_USER_TRANSACTION,
  GET_USER_TRANSACTIONS,
  USER_TRANSACTIONS_LOADING,
} from "./types";

// Add transaction
export const addUserTransaction = (data) => (dispatch) => {
  axios
    .post("api/transactions/add", data)
    .then((res) =>
      dispatch({
        type: ADD_USER_TRANSACTION,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};

// Delete transaction
export const deleteUserTransaction = (txnData) => (dispatch) => {
  const id = txnData.id;
  axios
    .delete(`api/transactions/${id}`)
    .then((res) =>
      dispatch({
        type: DELETE_USER_TRANSACTION,
        payload: id,
      })
    )
    .catch((err) => console.log(err));
};

// Get all transactions
export const getUserTransactions = () => (dispatch) => {
  dispatch(setUserTransactionsLoading());
  axios
    .get("api/transactions", {})
    .then((res) =>
      dispatch({
        type: GET_USER_TRANSACTIONS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_USER_TRANSACTIONS,
        payload: null,
      })
    );
};

// Transactions loading
export const setUserTransactionsLoading = () => {
  return {
    type: USER_TRANSACTIONS_LOADING,
  };
};
