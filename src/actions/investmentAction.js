import axios from "axios";
import {
  ADD_INVESTMENT,
  GET_INVESTMENTS,
  INVESTMENTS_LOADING,
  DELETE_INVESTMENT,
  MERGE_WITH_YAHOO,
} from "./types";

// Add investment
export const addInvestment = (data) => (dispatch) => {
  axios
    .post("api/investments/add", data)
    .then((res) =>
      dispatch({
        type: ADD_INVESTMENT,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};

// Get all investments for the user
export const getInvestments = () => {
  return async (dispatch) => {
    dispatch(setInvestmentsLoading());
    const response = await axios
      .get("api/investments")
      .then((res) =>
        dispatch({
          type: GET_INVESTMENTS,
          payload: res.data,
        })
      )
      .catch((err) =>
        dispatch({
          type: GET_INVESTMENTS,
          payload: null,
        })
      );

    return response;
  };
};

// Investments loading
export const setInvestmentsLoading = () => {
  return {
    type: INVESTMENTS_LOADING,
  };
};

// Given array containing latest yahoo finance stocks
// and user investments, replace it with current one.
export const mergeWithYahoo = (data) => (dispatch) => {
  dispatch({
    type: MERGE_WITH_YAHOO,
    payload: data,
  });
};
