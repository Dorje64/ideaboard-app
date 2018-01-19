import {createStore , applyMiddleware,compose } from 'redux';
import { createLogger } from "redux-logger";
import promise from "redux-promise-middleware";
import thunk from "redux-thunk"

//import root reducer
import rootReducer from './reducers/index'
const middleware = applyMiddleware(  promise(),  thunk,  createLogger() );

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
      middleware
      // other store enhancers if any
);

const store = createStore(rootReducer, enhancer);

export default store;
