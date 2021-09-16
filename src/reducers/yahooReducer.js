import {
  GET_TICKER_DATA,
  TICKER_DATA_LOADING,
  GET_SEARCH_DATA,
  SEARCH_DATA_LOADING,
} from "../actions/types";

const initialState = {
  searchData: [],
  searchDataLoading: false,
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
    case GET_TICKER_DATA: {
      return {
        ...state,
        tickerData: [action.payload, ...state.tickerData],
        tickerDataLoading: false,
      };
    }
    case SEARCH_DATA_LOADING:
      return {
        ...state,
        searchDataLoading: true,
      };
    case GET_SEARCH_DATA: {
      return {
        ...state,
        searchData: [action.payload],
        searchDataLoading: false,
      };
    }

    default:
      return state;
  }
}