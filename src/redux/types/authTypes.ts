import User from "../../models/User";

export const AUTH_START = "AUTH_START";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";

export const VERIFY_START = "VERIFY_START";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";
export const VERIFY_FAIL = "VERIFY_FAIL";

export const RESET_PASSWORD_START = "RESET_PASSWORD_START";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAIL = "RESET_PASSWORD_FAIL";

export const UPDATE_USER_START = "UPDATE_USER_START";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAIL = "UPDATE_USER_FAIL";

export const MARK_USER_VERIFIED = "MARK_USER_VERIFIED";

export const LOGOUT_USER = "LOGOUT_USER";
export const CLEAR_OUT = "CLEAR_OUT";

export interface AuthStartAction { 
  type: typeof AUTH_START; 
};
export interface AuthSuccessAction { 
  type: typeof AUTH_SUCCESS;
  payload: User;
};
export interface AuthFailAction { 
  type: typeof AUTH_FAIL;
  payload: string;
};

export interface VerifyStartAction { 
  type: typeof VERIFY_START;
};
export interface VerifySuccessAction { 
  type: typeof VERIFY_SUCCESS; 
  payload: string;
};
export interface VerifyFailAction { 
  type: typeof VERIFY_FAIL; 
  payload: string;
};

export interface ResetPasswordStart { 
  type: typeof RESET_PASSWORD_START;
};
export interface ResetPasswordSuccess { 
  type: typeof RESET_PASSWORD_SUCCESS;  
  payload: string;
};
export interface ResetPasswordFail { 
  type: typeof RESET_PASSWORD_FAIL; 
  payload: string;
};

interface DataToEdit {
  email?: string,
  displayName?: string;
};
export interface UpdateUserStart { 
  type: typeof UPDATE_USER_START;
};
export interface UpdateUserSuccess { 
  type: typeof UPDATE_USER_SUCCESS; 
  payload: {
    message: string;
    data: DataToEdit;
  }; 
};
export interface UpdateUserFail { 
  type: typeof UPDATE_USER_FAIL;  
  payload: string;
};

export interface MarkUserVerified {
  type: typeof MARK_USER_VERIFIED;
};

export interface LogoutAction {
  type: typeof LOGOUT_USER; 
};
export interface ClearOutAction {
  type: typeof CLEAR_OUT; 
};

export type AuthActionTypes = 
                            AuthStartAction | 
                            AuthSuccessAction | 
                            AuthFailAction | 
                            LogoutAction |
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
                            MarkUserVerified; 
