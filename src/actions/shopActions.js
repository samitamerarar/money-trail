import axios from "axios";
import {
  ADD_SHOP,
  DELETE_SHOPS,
  GET_SHOPS,
  GET_SHOPS_ALL,
  SHOPS_LOADING,
} from "./types";

// Add shop
export const addShop = (data) => (dispatch) => {
  axios
    .post("api/shops/add", data)
    .then((res) =>
      dispatch({
        type: ADD_SHOP,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};

// Delete shops
export const deleteShops = (data) => (dispatch) => {
  let ids = data.ids.join(",");
  axios
    .delete(`api/shops/${ids}`)
    .then((res) =>
      dispatch({
        type: DELETE_SHOPS,
        payload: ids,
      })
    )
    .catch((err) => console.log(err));
};

// Get all shops for specific category
export const getShops = (data) => (dispatch) => {
  dispatch(setShopsLoading());
  axios
    .get("api/shops", {
      params: {
        category: data.category,
      },
    })
    .then((res) =>
      dispatch({
        type: GET_SHOPS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_SHOPS,
        payload: null,
      })
    );
};

// Get all shops for all categories
export const getAllShops = () => (dispatch) => {
  axios
    .get("api/shops/all")
    .then((res) =>
      dispatch({
        type: GET_SHOPS_ALL,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_SHOPS_ALL,
        payload: null,
      })
    );
};

// Shops loading
export const setShopsLoading = () => {
  return {
    type: SHOPS_LOADING,
  };
};
