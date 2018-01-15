import {combineReducers} from 'redux';
import ideaReducer from './ideaReducer.js'
import conversationReducer from './conversationReducer.js'

const rootReducer = combineReducers({idea: ideaReducer, converstation: conversationReducer})
export default rootReducer
