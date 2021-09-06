import { AuthActionTypes, SET_USER, SET_ERROR, LOGOUT_USER, SET_LOADING } from "../types/authTypes";
import User from "../../utilities/models/User";

export interface AuthState {
  user: User|null;
  isAuth: boolean;
  errorMessage: string|null;
  loading: boolean;
};

const initialState: AuthState = {
  user: null,
  isAuth: false,
  errorMessage: null,
  loading: false,
};

const authReducer = (state: AuthState = initialState, action: AuthActionTypes) => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        user: action.payload,
        isAuth: true,
      }
    };
    case LOGOUT_USER: {
      return {
        ...state,
        user: null,
        isAuth: false,
      }
    }
    case SET_ERROR: {
      return {
        ...state,
        errorMessage: action.payload
      }
    };
    case SET_LOADING: {
      return {
        ...state,
        loading: action.payload
      }
    };
    default: {
      return state;
    }
  }
};

export default authReducer;