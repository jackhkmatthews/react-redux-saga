import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import createSagaMiddleware from "redux-saga";
import apiSaga from "./sagas/api-saga";

const logger = store => next => action => {
  console.log("action fired", action);
  next(action);
};

const initialiseSagaMiddleware = createSagaMiddleware();

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = applyMiddleware(logger, initialiseSagaMiddleware);

const store = createStore(rootReducer, storeEnhancers(middleware));

initialiseSagaMiddleware.run(apiSaga);

export default store;
