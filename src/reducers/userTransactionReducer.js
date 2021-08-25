import {
  ADD_USER_TRANSACTION,
  DELETE_USER_TRANSACTION,
  GET_USER_TRANSACTIONS,
  USER_TRANSACTIONS_LOADING,
} from "../actions/types";

const initialState = {
  transactions: [],
  transactionsLoading: false,
};

export default function userTransactionReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_USER_TRANSACTION:
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };
    case DELETE_USER_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(
          (txn) => txn._id !== action.payload
        ),
      };
    case GET_USER_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
        transactionsLoading: false,
      };
    case USER_TRANSACTIONS_LOADING:
      return {
        ...state,
        transactionsLoading: true,
      };
    default:
      return state;
  }
}
