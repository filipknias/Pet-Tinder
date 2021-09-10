import { Pet, Pagination } from "../../types/apiTypes";
import { StorageToken } from "../../types/globalTypes";
import * as petsTypes from "../types/petsTypes";

export interface PetsState {
  pets: Pet[];
  pagination: Pagination|null;
  token: StorageToken|null;
  loading: boolean;
  isError: boolean;
};

const initialState: PetsState = {
  pets: [],
  pagination: null,
  token: null,
  loading: false,
  isError: false,
};

const petsReducer = (state: PetsState = initialState, action: petsTypes.PetsActionTypes): PetsState => {
  switch (action.type) {
    case petsTypes.PETS_START: {
      return {
        ...state,
        loading: true,
        isError: false,
      }
    };
    case petsTypes.PETS_SUCCESS: {
      return {
        ...state,
        pets: action.payload.pets,
        pagination: action.payload.pagination,
        loading: false,
      }
    };
    case petsTypes.PETS_FAIL: {
      return {
        ...state,
        loading: false,
        isError: true,
      }
    };
    case petsTypes.TOKEN_START: {
      return {
        ...state,
        loading: true,
        isError: false,
      }
    }; 
    case petsTypes.TOKEN_SUCCESS: {
      return {
        ...state,
        token: action.payload,
        loading: false,
      }
    };
    case petsTypes.TOKEN_FAIL: {
      return {
        ...state,
        loading: false,
        isError: true,
      }
    };  
    case petsTypes.NEXT_PAGE: {
      if (state.pagination === null) return state;
      return {
        ...state,
        pagination: { ...state.pagination, current_page: action.payload },
      }
    };
    default: {
      return state;
    }
  }
};

export default petsReducer;