import axios from "axios";
import {
  ADD_INVESTMENT,
  GET_INVESTMENTS,
  INVESTMENTS_LOADING,
  DELETE_INVESTMENT,
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
export const getInvestments = () => (dispatch) => {
  dispatch(setInvestmentsLoading());
  axios
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
};

// Investments loading
export const setInvestmentsLoading = () => {
  return {
    type: INVESTMENTS_LOADING,
  };
};
