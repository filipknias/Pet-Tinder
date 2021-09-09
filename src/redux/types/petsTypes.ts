import { Pet, Pagination } from "../../types/apiTypes";
import { StorageToken } from "../../types/globalTypes";

export const SET_PETS = "SET_PETS";
export const SET_PAGINATION = "SET_PAGINATION";
export const SET_TOKEN = "SET_TOKEN";
export const SET_LOADING = "SET_PETS_LOADING";
export const SET_ERROR = "SET_PETS_ERROR";
 
export interface SetPetsAction { 
  type: typeof SET_PETS,
  payload: Pet[],
};
export interface SetPaginationAction { 
  type: typeof SET_PAGINATION,
  payload: Pagination|null,
};
export interface SetTokenAction { 
  type: typeof SET_TOKEN,
  payload: StorageToken,
};
export interface SetLoadingAction { 
  type: typeof SET_LOADING,
  payload: boolean,
};
export interface SetErrorAction { 
  type: typeof SET_ERROR,
  payload: boolean,
};

export type PetsActionTypes = SetPetsAction | SetPaginationAction | SetTokenAction | SetLoadingAction | SetErrorAction; 
