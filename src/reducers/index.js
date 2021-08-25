import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import shopReducer from "./shopReducer";
import userTransactionReducer from "./userTransactionReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  shops: shopReducer,
  userTransactions: userTransactionReducer,
});
