import {combineReducers} from "redux";
import authReducer from "./authReducer";
import logger from "redux-logger";
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    auth: authReducer,
})

let storeEnhancer;

if (process.env.NODE_ENV !== "production") {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  storeEnhancer = composeEnhancers(applyMiddleware(thunk));
} else {
  storeEnhancer = applyMiddleware(thunk, logger);
}

export default function configureStore(initialState = {}) {
  return createStore(rootReducer, initialState, storeEnhancer);
}
