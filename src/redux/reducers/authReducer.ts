import * as authTypes from "../types/authTypes";
import User from "../../models/User";
import { AuthFeedback } from "../../types/global";

interface VerifyUser {
  feedback: AuthFeedback|null;
  loading: boolean;
};

interface ResetPassword {
  feedback: AuthFeedback|null;
  loading: boolean;
};

interface Logout {
  feedback: AuthFeedback|null;
  loading: boolean;
}

interface DeleteUser {
  feedback: AuthFeedback|null;
  loading: boolean;
}

export interface AuthState {
  user: User|null;
  isAuth: boolean;
  authFeedback: AuthFeedback|null;
  loading: boolean;
  verifyUser: VerifyUser;
  resetPassword: ResetPassword;
  logout: Logout;
  deleteUser: DeleteUser;
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
  resetPassword: {
    feedback: null,
    loading: false,
  },
  logout: {
    feedback: null,
    loading: false,
  },
  deleteUser: {
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
    case authTypes.SIGN_IN_WITH_PROVIDER_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        isAuth: true,
        authFeedback: null,
      }
    };
    case authTypes.SIGN_IN_WITH_PROVIDER_FAIL: {
      return {
        ...state,
        authFeedback: {
          type: "fail",
          message: action.payload,
        },
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
    case authTypes.RESET_PASSWORD_START: {
      return {
        ...state,
        resetPassword: {
          feedback: null,
          loading: true,
        },  
      }
    };
    case authTypes.RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPassword: {
          feedback: {
            type: "success",
            message: action.payload,
          },
          loading: false,
        },  
      }
    };
    case authTypes.RESET_PASSWORD_FAIL: {
      return {
        ...state,
        resetPassword: {
          feedback: {
            type: "fail",
            message: action.payload,
          },
          loading: false,
        },  
      }
    };
    case authTypes.LOGOUT_USER_START: {
      return {
        ...state,
        logout: {
          loading: true,
          feedback: null,
        },
      }
    };
    case authTypes.LOGOUT_USER_SUCCESS: {
      return {
        ...state,
        user: null,
        isAuth: false,
        logout: {
          loading: false,
          feedback: null,
        },
      }
    };
    case authTypes.LOGOUT_USER_FAIL: {
      return {
        ...state,
        logout: {
          loading: false,
          feedback: {
            type: "fail",
            message: action.payload,
          },
        },
      }
    };
    case authTypes.DELETE_USER_START: {
      return {
        ...state,
        deleteUser: {
          loading: true,
          feedback: null,
        },
      }
    };
    case authTypes.DELETE_USER_SUCCESS: {
      return {
        ...state,
        user: null,
        isAuth: false,
        deleteUser: {
          loading: false,
          feedback: null,
        },
      }
    };
    case authTypes.DELETE_USER_FAIL: {
      return {
        ...state,
        deleteUser: {
          loading: false,
          feedback: {
            type: "fail",
            message: action.payload,
          },
        },
      }
    };
    case authTypes.MARK_USER_VERIFIED: {
      if (state.user === null) return state;
      return {
        ...state,
        user: { 
          ...state.user,
          verified: true,
        },
      }
    };
    case authTypes.UPDATE_USER_START: {
      return {
        ...state,
        authFeedback: null,
        loading: true, 
      }
    };
    case authTypes.UPDATE_USER_SUCCESS: {
      if (state.user === null) return state;
      return {
        ...state,
        loading: false,
        authFeedback: {
          type: "success",
          message: action.payload.message,
        },
        user: {
          ...state.user,
          ...action.payload.data,
        }
      }
    };
    case authTypes.UPDATE_USER_FAIL: {
      return {
        ...state,
        authFeedback: {
          type: "fail",
          message: action.payload,
        },
        loading: false,
      }
    };
    case authTypes.CLEAR_OUT: {
      return {
        ...state,
        authFeedback: null,
        verifyUser: {
          ...state.verifyUser,
          feedback: null,
        },
        resetPassword: {
          ...state.resetPassword,
          feedback: null,
        },
        logout: {
          ...state.logout,
          feedback: null,
        },
        deleteUser: {
          ...state.deleteUser,
          feedback: null,
        },  
      }
    };
    default: {
      return state;
    }
  }
};

export default authReducer;