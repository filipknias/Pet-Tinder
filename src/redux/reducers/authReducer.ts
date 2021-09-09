import { AuthActionTypes, LOGOUT_USER, AUTH_START, AUTH_SUCCESS, AUTH_FAIL } from "../types/authTypes";
import User from "../../models/User";
import { AuthFeedback } from "../../types/globalTypes";

export interface AuthState {
  user: User|null;
  isAuth: boolean;
  authFeedback: AuthFeedback|null;
  loading: boolean;
};

const initialState: AuthState = {
  user: null,
  isAuth: false,
  authFeedback: null,
  loading: false,
};

const authReducer = (state: AuthState = initialState, action: AuthActionTypes): AuthState => {
  switch (action.type) {
    case AUTH_START: {
      return {
        ...state,
        loading: true,
        authFeedback: null,
      }
    };
    case AUTH_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        isAuth: true,
        loading: false,
      }
    };
    case AUTH_FAIL: {
      return {
        ...state,
        authFeedback: {
          type: "fail",
          message: action.payload
        },
        loading: false,
      }
    };
    case LOGOUT_USER: {
      return {
        ...state,
        user: null,
        isAuth: false,
        authFeedback: null,
      }
    };
    default: {
      return state;
    }
  }
};

export default authReducer;