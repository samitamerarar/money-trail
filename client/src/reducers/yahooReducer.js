import {
    GET_TICKER_DATA,
    TICKER_DATA_LOADING,
    GET_SEARCH_DATA,
    CLEAR_SEARCH_DATA,
    SEARCH_DATA_LOADING,
    GET_HISTORICAL_DATA,
    HISTORICAL_DATA_LOADING,
    DELETE_TICKER
} from '../actions/types';

const isEmpty = require('is-empty');
const initialState = {
    searchData: [],
    searchDataLoading: false,
    tickerData: [],
    tickerDataLoading: false,
    historicalData: [],
    historicalDataLoading: false,
    errors: []
};

export default function yahooReducer(state = initialState, action) {
    switch (action.type) {
        case TICKER_DATA_LOADING:
            return {
                ...state,
                tickerDataLoading: true
            };
        case GET_TICKER_DATA: {
            if (!isEmpty(action.payload)) {
                return {
                    ...state,
                    tickerData: [action.payload, ...state.tickerData],
                    tickerDataLoading: false
                };
            }
        }
        case SEARCH_DATA_LOADING:
            return {
                ...state,
                searchDataLoading: true
            };
        case GET_SEARCH_DATA: {
            if (!isEmpty(action.payload)) {
                {
                    return {
                        ...state,
                        searchData: [action.payload],
                        searchDataLoading: false
                    };
                }
            }
        }
        case CLEAR_SEARCH_DATA: {
            return {
                ...state,
                searchData: []
            };
        }
        case HISTORICAL_DATA_LOADING:
            return {
                ...state,
                historicalDataLoading: true
            };
        case GET_HISTORICAL_DATA: {
            if (!isEmpty(action.payload)) {
                {
                    return {
                        ...state,
                        historicalData: [action.payload, ...state.historicalData],
                        historicalDataLoading: false
                    };
                }
            }
        }
        case DELETE_TICKER:
            return {
                ...state,
                tickerData: state.tickerData.filter((e) => e.symbol !== action.payload),
                historicalData: state.historicalData.filter((e) => e.symbol !== action.payload)
            };

        default:
            return state;
    }
}
