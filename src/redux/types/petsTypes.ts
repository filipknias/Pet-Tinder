import { Pet, Pagination } from "../../types/api";
import { Filters, StorageToken } from "../../types/global";

export const PETS_START = "PETS_START";
export const PETS_SUCCESS = "PETS_SUCCESS";
export const PETS_FAIL = "PETS_FAIL";

export const TOKEN_START = "TOKEN_START";
export const TOKEN_SUCCESS = "TOKEN_SUCCESS";
export const TOKEN_FAIL = "TOKEN_FAIL";

export const UPDATE_FILTERS = "UPDATE_FILTERS";
export const CLEAR_FILTERS = "CLEAR_FILTERS";

export const NEXT_PAGE = "NEXT_PAGE";

interface PetsApiResponse {
  pets: Pet[],
  pagination: Pagination,
};

interface PetsStartAction {
  type: typeof PETS_START,
};
interface PetsSuccessAction {
  type: typeof PETS_SUCCESS,
  payload: PetsApiResponse,
};
interface PetsFailAction { 
  type: typeof PETS_FAIL, 
};

interface TokenStartAction {
  type: typeof TOKEN_START,
};
interface TokenSuccessAction {
  type: typeof TOKEN_SUCCESS,
  payload: StorageToken,
};
interface TokenFailAction {
  type: typeof TOKEN_FAIL,
};

interface UpdateFiltersAction {
  type: typeof UPDATE_FILTERS,
  payload: Filters;
}
interface ClearFiltersAction {
  type: typeof CLEAR_FILTERS,
}

interface NextPageAction {
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
            UpdateFiltersAction |
            ClearFiltersAction | 
            NextPageAction;
