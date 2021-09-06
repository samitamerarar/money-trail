import axios from "axios";
import {
  GET_TICKER_DATA,
  TICKER_DATA_LOADING,
  GET_SEARCH_DATA,
  SEARCH_DATA_LOADING,
} from "./types";

export const searchStock = (symbol) => {
  return async (dispatch) => {
    dispatch(setSearchDataLoading());
    symbol = symbol.toUpperCase();
    const response = await axios
      .get("/api/yahoo-finance/search", {
        params: {
          symbol: symbol,
        },
      })
      .then((res) =>
        dispatch({
          type: GET_SEARCH_DATA,
          payload: res.data,
        })
      )
      .catch((err) =>
        dispatch({
          type: GET_SEARCH_DATA,
          payload: null,
        })
      );

    return response;
  };
};

// Get ticker symbol data
export const getTickerData = (data) => {
  return async (dispatch) => {
    dispatch(setTickerDataLoading());
    const response = await axios
      .get("api/yahoo-finance", {
        params: {
          symbol: data.symbol,
        },
      })
      .then((res) =>
        dispatch({
          type: GET_TICKER_DATA,
          payload: res.data,
        })
      )
      .catch((err) =>
        dispatch({
          type: GET_TICKER_DATA,
          payload: null,
        })
      );

    return response;
  };
};

// Ticker data loading
export const setTickerDataLoading = () => {
  return {
    type: TICKER_DATA_LOADING,
  };
};

// Ticker data loading
export const setSearchDataLoading = () => {
  return {
    type: SEARCH_DATA_LOADING,
  };
};
