import { GET_TICKER_DATA, TICKER_DATA_LOADING } from "../actions/types";

const initialState = {
  tickerData: [],
  tickerDataLoading: false,
};

export default function yahooReducer(state = initialState, action) {
  switch (action.type) {
    case TICKER_DATA_LOADING:
      return {
        ...state,
        tickerDataLoading: true,
      };
    case GET_TICKER_DATA:
      return {
        ...state,
        tickerData: action.payload,
        tickerDataLoading: false,
      };
    default:
      return state;
  }
}
