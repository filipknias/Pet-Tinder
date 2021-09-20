import User from "../../models/User";

export const AUTH_START = "AUTH_START";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";

export const SIGN_IN_WITH_PROVIDER_SUCCESS = "SIGN_IN_WITH_PROVIDER_SUCCESS";
export const SIGN_IN_WITH_PROVIDER_FAIL = "SIGN_IN_WITH_PROVIDER_FAIL";

export const VERIFY_START = "VERIFY_START";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";
export const VERIFY_FAIL = "VERIFY_FAIL";

export const RESET_PASSWORD_START = "RESET_PASSWORD_START";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAIL = "RESET_PASSWORD_FAIL";

export const UPDATE_USER_START = "UPDATE_USER_START";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAIL = "UPDATE_USER_FAIL";

export const LOGOUT_USER_START = "LOGOUT_USER_START";
export const LOGOUT_USER_SUCCESS = "LOGOUT_USER_SUCCESS";
export const LOGOUT_USER_FAIL = "LOGOUT_USER_FAIL";

export const DELETE_USER_START = "DELETE_USER_START";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAIL = "DELETE_USER_FAIL";

export const MARK_USER_VERIFIED = "MARK_USER_VERIFIED";

export const CLEAR_OUT = "CLEAR_OUT";

interface AuthStartAction { 
  type: typeof AUTH_START; 
};
interface AuthSuccessAction { 
  type: typeof AUTH_SUCCESS;
  payload: User;
};
interface AuthFailAction { 
  type: typeof AUTH_FAIL;
  payload: string;
};

interface SignInWithProviderSuccess {
  type: typeof SIGN_IN_WITH_PROVIDER_SUCCESS;
  payload: User;
};
interface SignInWithProviderFail {
  type: typeof SIGN_IN_WITH_PROVIDER_FAIL;
  payload: string;
};

interface VerifyStartAction { 
  type: typeof VERIFY_START;
};
interface VerifySuccessAction { 
  type: typeof VERIFY_SUCCESS; 
  payload: string;
};
interface VerifyFailAction { 
  type: typeof VERIFY_FAIL; 
  payload: string;
};

interface ResetPasswordStart { 
  type: typeof RESET_PASSWORD_START;
};
interface ResetPasswordSuccess { 
  type: typeof RESET_PASSWORD_SUCCESS;  
  payload: string;
};
interface ResetPasswordFail { 
  type: typeof RESET_PASSWORD_FAIL; 
  payload: string;
};

interface DataToEdit {
  email?: string,
  displayName?: string;
};
interface UpdateUserStart { 
  type: typeof UPDATE_USER_START;
};
interface UpdateUserSuccess { 
  type: typeof UPDATE_USER_SUCCESS; 
  payload: {
    message: string;
    data: DataToEdit;
  }; 
};
interface UpdateUserFail { 
  type: typeof UPDATE_USER_FAIL;  
  payload: string;
};

interface LogoutStartAction {
  type: typeof LOGOUT_USER_START; 
};
interface LogoutSuccessAction {
  type: typeof LOGOUT_USER_SUCCESS; 
};
interface LogoutFailAction {
  type: typeof LOGOUT_USER_FAIL; 
  payload: string; 
};

interface DeleteUserStart {
  type: typeof DELETE_USER_START; 
};
interface DeleteUserSuccess {
  type: typeof DELETE_USER_SUCCESS; 
};
interface DeleteUserFail {
  type: typeof DELETE_USER_FAIL; 
  payload: string; 
};


interface MarkUserVerified {
  type: typeof MARK_USER_VERIFIED;
};

interface ClearOutAction {
  type: typeof CLEAR_OUT; 
};

export type AuthActionTypes = 
                            AuthStartAction | 
                            AuthSuccessAction | 
                            AuthFailAction |
                            SignInWithProviderSuccess |
                            SignInWithProviderFail | 
                            LogoutStartAction |
                            LogoutSuccessAction |
                            LogoutFailAction |
                            VerifyStartAction |
                            VerifySuccessAction |
                            VerifyFailAction |
                            ClearOutAction |
                            UpdateUserStart |
                            UpdateUserSuccess |
                            UpdateUserFail |
                            ResetPasswordStart |
                            ResetPasswordSuccess |
                            ResetPasswordFail |
                            MarkUserVerified |
                            DeleteUserStart |
                            DeleteUserSuccess |
                            DeleteUserFail; 
