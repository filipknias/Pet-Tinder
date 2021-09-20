import { applyMiddleware, createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import petsReducer from "./reducers/petsReducer";
import authReducer from "./reducers/authReducer";
import uiReducer from "./reducers/uiReducer";

const composeEnhancers = composeWithDevTools({});
const middleware = [thunk];
const reducers = combineReducers({
  petsReducer,
  authReducer,
  uiReducer,
});

const store = createStore(reducers, composeEnhancers(applyMiddleware(...middleware)));
export type RootState = ReturnType<typeof reducers>;

export default store;