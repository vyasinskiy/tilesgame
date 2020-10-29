import { combineReducers, createStore, applyMiddleware } from "redux";
import gameReducer from './gameReducer.js';
import thunk from 'redux-thunk'

let reducers = combineReducers({
    game: gameReducer
})

let store = createStore(reducers, applyMiddleware(thunk) );

window.store = store;

export default store;