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
    case ADD_INVESTMENT: {
      // When we EDIT an investment, we want to mark it as justModified
      // So we know we will need to retrieve data from the API only for
      // this modified investment ticker symbol.

      // Here, we remove justModified field from previous edited one, if there is any.
      const investmentsList = state.investmentsList.map(
        ({ justModified, ...keepAttrs }) => keepAttrs
      );
      // Then, we add justModified to the recently edited one.
      action.payload["justModified"] = true;

      return {
        ...state,
        // investmentsList: [action.payload, ...state.investmentsList],
        investmentsList: [
          action.payload,
          ...investmentsList.filter((e) => e.symbol !== action.payload.symbol),
        ],

        investmentsLoading: false,
      };
    }

    case GET_INVESTMENTS:
      return {
        ...state,
        investmentsList: [...action.payload],

        investmentsLoading: false,
      };
    case DELETE_INVESTMENT:
      return {
        ...state,
        investmentsList: state.investmentsList.filter(
          (e) => e._id !== action.payload
        ),

        investmentsLoading: false,
      };
    case MERGE_WITH_YAHOO:
      return {
        ...state,
        investmentsList: [...action.payload],

        investmentsLoading: false,
      };

    default:
      return state;
  }
}
