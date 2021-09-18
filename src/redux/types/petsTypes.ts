import { Pet, Pagination } from "../../types/api";
import { StorageToken } from "../../types/global";

export const PETS_START = "PETS_START";
export const PETS_SUCCESS = "PETS_SUCCESS";
export const PETS_FAIL = "PETS_FAIL";

export const TOKEN_START = "TOKEN_START";
export const TOKEN_SUCCESS = "TOKEN_SUCCESS";
export const TOKEN_FAIL = "TOKEN_FAIL";

export const NEXT_PAGE = "NEXT_PAGE";

interface PetsApiResponse {
  pets: Pet[],
  pagination: Pagination,
};

export interface PetsStartAction {
  type: typeof PETS_START,
};
export interface PetsSuccessAction {
  type: typeof PETS_SUCCESS,
  payload: PetsApiResponse,
};
export interface PetsFailAction { 
  type: typeof PETS_FAIL, 
};

export interface TokenStartAction {
  type: typeof TOKEN_START,
};
export interface TokenSuccessAction {
  type: typeof TOKEN_SUCCESS,
  payload: StorageToken,
};
export interface TokenFailAction {
  type: typeof TOKEN_FAIL,
};
export interface NextPageAction {
  type: typeof NEXT_PAGE,
  payload: number,
}

export type PetsActionTypes = 
            PetsStartAction | 
            PetsSuccessAction | 
            PetsFailAction | 
            TokenStartAction | 
            TokenSuccessAction | 
            TokenFailAction |
            NextPageAction;
