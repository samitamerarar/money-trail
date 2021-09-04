import {
  ADD_INVESTMENT,
  GET_INVESTMENTS,
  INVESTMENTS_LOADING,
  DELETE_INVESTMENT,
} from "../actions/types";

const initialState = {
  investments: [],
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
        investments: action.payload,
        investmentsLoading: false,
      };
    case GET_INVESTMENTS:
      return {
        ...state,
        investments: [...action.payload, ...state.investments],
      };
    default:
      return state;
  }
}
