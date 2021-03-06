import axios from 'axios';
import {
    GET_TICKER_DATA,
    TICKER_DATA_LOADING,
    GET_SEARCH_DATA,
    CLEAR_SEARCH_DATA,
    SEARCH_DATA_LOADING,
    GET_HISTORICAL_DATA,
    HISTORICAL_DATA_LOADING,
    DELETE_TICKER
} from './types';

export const searchStock = (symbol) => {
    return async (dispatch) => {
        dispatch(setSearchDataLoading());
        symbol = symbol.toUpperCase();
        const response = await axios
            .get('/api/yahoo-finance/search', {
                params: {
                    symbol: symbol
                }
            })
            .then((res) =>
                dispatch({
                    type: GET_SEARCH_DATA,
                    payload: res.data
                })
            )
            .catch((err) =>
                dispatch({
                    type: GET_SEARCH_DATA,
                    payload: null
                })
            );

        return response;
    };
};

export const clearSearchStockState = () => {
    return {
        type: CLEAR_SEARCH_DATA
    };
};

// Get ticker symbol data
export const getTickerData = (data) => {
    return async (dispatch) => {
        dispatch(setTickerDataLoading());
        const response = await axios
            .get('api/yahoo-finance', {
                params: {
                    symbol: data.symbol
                }
            })
            .then((res) =>
                dispatch({
                    type: GET_TICKER_DATA,
                    payload: res.data
                })
            )
            .catch((err) =>
                dispatch({
                    type: GET_TICKER_DATA,
                    payload: null
                })
            );

        return response;
    };
};

// Get historical data for symbol
export const getHistoricalData = (data) => {
    return async (dispatch) => {
        dispatch(setHistoricalDataLoading());
        const queryOptions = { period1: data.minDate, interval: '1d' };
        const response = await axios
            .get('api/yahoo-finance/historical', {
                params: {
                    symbol: data.symbol,
                    queryOptions: queryOptions
                }
            })
            .then((res) =>
                dispatch({
                    type: GET_HISTORICAL_DATA,
                    payload: res.data
                })
            )
            .catch((err) =>
                dispatch({
                    type: GET_HISTORICAL_DATA,
                    payload: null
                })
            );

        return response;
    };
};

// Delete ticker info
export const deleteTicker = (data) => {
    return {
        type: DELETE_TICKER,
        payload: data.symbol
    };
};

// Ticker data loading
export const setTickerDataLoading = () => {
    return {
        type: TICKER_DATA_LOADING
    };
};

// Ticker data loading
export const setSearchDataLoading = () => {
    return {
        type: SEARCH_DATA_LOADING
    };
};

// Ticker data loading
export const setHistoricalDataLoading = () => {
    return {
        type: HISTORICAL_DATA_LOADING
    };
};
