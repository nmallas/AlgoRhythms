import {combineReducers} from "redux";
import authReducer from "./authReducer";
import logger from "redux-logger";
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import quizReducer from "./quizReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    quizzes: quizReducer
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
