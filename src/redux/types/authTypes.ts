import User from "../../models/User";

export const AUTH_START = "AUTH_START";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";

export const LOGOUT_USER = "LOGOUT_USER";

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
export interface LogoutAction {
  type: typeof LOGOUT_USER; 
};

export type AuthActionTypes = AuthStartAction | AuthSuccessAction | AuthFailAction | LogoutAction; 
