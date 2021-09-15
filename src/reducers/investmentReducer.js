import {
  ADD_INVESTMENT,
  GET_INVESTMENTS,
  INVESTMENTS_LOADING,
  DELETE_INVESTMENT,
  MERGE_WITH_YAHOO,
} from "../actions/types";

const initialState = {
  investmentsList: [],
  investmentsLoading: false,
};

export default function shopReducer(state = initialState, action) {
  switch (action.type) {
    case INVESTMENTS_LOADING:
      return {
        ...state,
        investmentsLoading: true,
      };
    case ADD_INVESTMENT:
      return {
        ...state,
        // investmentsList: [action.payload, ...state.investmentsList],
        investmentsList: [
          action.payload,
          ...state.investmentsList.filter(
            (e) => e.symbol !== action.payload.symbol
          ),
        ],
      };
    case GET_INVESTMENTS:
      return {
        ...state,
        investmentsList: [...action.payload],
        investmentsLoading: false,
      };
    case MERGE_WITH_YAHOO:
      return {
        ...state,
        investmentsList: [...action.payload],
      };
    default:
      return state;
  }
}
