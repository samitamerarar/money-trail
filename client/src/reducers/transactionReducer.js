import {
  ADD_TRANSACTION,
  DELETE_TRANSACTION,
  GET_TRANSACTIONS,
  TRANSACTIONS_LOADING,
} from "../actions/types";

const initialState = {
  transactions: [],
  transactionsLoading: false,
};

export default function transactionReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TRANSACTION:
      return {
        ...state,
        transactions: [
          action.payload,
          ...state.transactions.filter((e) => e._id !== action.payload._id),
        ],
      };

    case DELETE_TRANSACTION: {
      console.log(
        state.transactions.filter((txn) => txn._id !== action.payload)
      );
      return {
        ...state,
        transactions: state.transactions.filter(
          (txn) => txn._id !== action.payload
        ),
      };
    }

    case GET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
        transactionsLoading: false,
      };

    case TRANSACTIONS_LOADING:
      return {
        ...state,
        transactionsLoading: true,
      };

    default:
      return state;
  }
}
