import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import shopReducer from './shopReducer';
import transactionReducer from './transactionReducer';
import yahooReducer from './yahooReducer';
import investmentReducer from './investmentReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    shops: shopReducer,
    transactions: transactionReducer,
    yahooFinance: yahooReducer,
    investments: investmentReducer
});
