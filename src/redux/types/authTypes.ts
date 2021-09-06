import User from "../../utilities/models/User";

export const SET_USER = "SET_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const SET_ERROR = "SET_AUTH_ERROR";
export const SET_LOADING = "SET_AUTH_LOADING";

export interface SetUserAction {
  type: typeof SET_USER;
  payload: User,
};
export interface SetErrorAction { 
  type: typeof SET_ERROR,
  payload: string|null,
};
export interface LogoutUserAction {
  type: typeof LOGOUT_USER,
};
export interface SetLoadingAction {
  type: typeof SET_LOADING;
  payload: boolean,
};

export type AuthActionTypes = SetUserAction | SetErrorAction | LogoutUserAction | SetLoadingAction; 
