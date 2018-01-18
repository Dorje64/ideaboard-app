import {createStore , applyMiddleware} from 'redux';
import { createLogger } from "redux-logger";
import promise from "redux-promise-middleware";
import thunk from "redux-thunk"

//import root reducer
import rootReducer from './reducers/index'
const middleware = applyMiddleware(  promise(),  thunk,  createLogger() );

const store = createStore(rootReducer, middleware);

export default store;
