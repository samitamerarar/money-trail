import axios from "axios";
import { GET_TICKER_DATA, TICKER_DATA_LOADING } from "./types";

// Get ticker symbol data
export const getTickerData = (data) => (dispatch) => {
  dispatch(setTickerDataLoading());
  axios
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
};

// Ticker data loading
export const setTickerDataLoading = () => {
  return {
    type: TICKER_DATA_LOADING,
  };
};
