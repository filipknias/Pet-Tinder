import { applyMiddleware, createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import petsReducer from "./reducers/petsReducer";

const composeEnhancers = composeWithDevTools({});
const middleware = [thunk];
const reducers = combineReducers({
  petsReducer,
});

const store = createStore(reducers, composeEnhancers(applyMiddleware(...middleware)));
export type RootState = ReturnType<typeof reducers>;

export default store;