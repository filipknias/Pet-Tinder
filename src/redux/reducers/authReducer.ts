import * as authTypes from "../types/authTypes";
import User from "../../models/User";
import { AuthFeedback } from "../../types/globalTypes";

interface VerifyUser {
  feedback: AuthFeedback|null;
  loading: boolean;
};

export interface AuthState {
  user: User|null;
  isAuth: boolean;
  authFeedback: AuthFeedback|null;
  loading: boolean;
  verifyUser: VerifyUser;
};

const initialState: AuthState = {
  user: null,
  isAuth: false,
  authFeedback: null,
  loading: false,
  verifyUser: {
    feedback: null,
    loading: false,
  },
};

const authReducer = (state: AuthState = initialState, action: authTypes.AuthActionTypes): AuthState => {
  switch (action.type) {
    case authTypes.AUTH_START: {
      return {
        ...state,
        loading: true,
        authFeedback: null,
      }
    };
    case authTypes.AUTH_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        isAuth: true,
        loading: false,
      }
    };
    case authTypes.AUTH_FAIL: {
      return {
        ...state,
        authFeedback: {
          type: "fail",
          message: action.payload
        },
        loading: false,
      }
    };
    case authTypes.VERIFY_START: {
      return {
        ...state,
        verifyUser: {
          feedback: null,
          loading: true,
        },  
      }
    };
    case authTypes.VERIFY_SUCCESS: {
      return {
        ...state,
        verifyUser: {
          feedback: {
            type: "success",
            message: action.payload,
          },
          loading: false,
        },  
      }
    };
    case authTypes.VERIFY_FAIL: {
      return {
        ...state,
        verifyUser: {
          feedback: {
            type: "fail",
            message: action.payload,
          },
          loading: false,
        },  
      }
    };
    case authTypes.LOGOUT_USER: {
      return {
        ...state,
        user: null,
        isAuth: false,
        authFeedback: null,
      }
    };
    case authTypes.UPDATE_USER: {
      return {
        ...state,
        user: { ...action.payload },
      }
    };
    case authTypes.CLEAR_OUT: {
      return {
        ...state,
        authFeedback: null,
        verifyUser: {
          ...state.verifyUser,
          feedback: null,
        }
      }
    };
    default: {
      return state;
    }
  }
};

export default authReducer;