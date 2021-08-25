import {
  ADD_SHOP,
  DELETE_SHOPS,
  GET_SHOPS,
  SHOPS_LOADING,
  GET_SHOPS_ALL,
} from "../actions/types";

const initialState = {
  shops: [],
  shopsAll: [],
  shopsLoading: false,
};

export default function shopReducer(state = initialState, action) {
  switch (action.type) {
    case SHOPS_LOADING:
      return {
        ...state,
        shopsLoading: true,
      };
    case GET_SHOPS:
      return {
        ...state,
        shops: action.payload,
        shopsLoading: false,
      };
    case ADD_SHOP:
      return {
        ...state,
        shops: [...action.payload, ...state.shops],
      };
    case DELETE_SHOPS:
      return {
        ...state,
        shops: state.shops.filter((shop) => !action.payload.includes(shop._id)),
      };
    case GET_SHOPS_ALL:
      return {
        ...state,
        shopsAll: action.payload,
      };
    default:
      return state;
  }
}
