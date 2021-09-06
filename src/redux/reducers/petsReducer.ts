import { Pet, Pagination } from "../../utilities/types/apiTypes";
import { StorageToken } from "../../utilities/types/globalTypes";
import { PetsActionTypes, SET_PETS, SET_PAGINATION, SET_TOKEN, SET_ERROR, SET_LOADING } from "../types/petsTypes";

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

const petsReducer = (state: PetsState = initialState, action: PetsActionTypes) => {
  switch (action.type) {
    case SET_PETS: {
      return {
        ...state,
        pets: action.payload
      }
    };
    case SET_PAGINATION: {
      return {
        ...state,
        pagination: action.payload
      }
    };
    case SET_TOKEN: {
      return {
        ...state,
        token: action.payload
      }
    };
    case SET_ERROR: {
      return {
        ...state,
        isError: action.payload
      }
    };
    case SET_LOADING: {
      return {
        ...state,
        loading: action.payload
      }
    };
    default: {
      return state;
    }
  }
};

export default petsReducer;