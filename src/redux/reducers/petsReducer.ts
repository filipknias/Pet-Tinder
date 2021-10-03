import { Pet, Pagination } from "../../types/api";
import { StorageToken, Filters } from "../../types/global";
import * as petsTypes from "../types/petsTypes";

interface Likes {
  loading: boolean;
  isError: boolean;
}

export interface PetsState {
  pets: Pet[];
  pagination: Pagination|null;
  token: StorageToken|null;
  filters: Filters;
  loading: boolean;
  isError: boolean;
  likes: Likes;
};

const initialState: PetsState = {
  pets: [],
  pagination: null,
  token: null,
  filters: {
    type: null,
    age: null,
    coat: null,
    color: null,
    gender: null,
    location: null,   
  },
  loading: false,
  isError: false,
  likes: {
    loading: false,
    isError: false,
  },
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
    case petsTypes.LIKES_START: {
      return {
        ...state,
        likes: {
          loading: true,
          isError: false,
        },
      }
    };
    case petsTypes.LIKES_SUCCESS: {
      return {
        ...state,
        pets: action.payload,
        pagination: null,
        likes: {
          loading: false,
          isError: false,
        },
      }
    };
    case petsTypes.LIKES_FAIL: {
      return {
        ...state,
        likes: {
          loading: false,
          isError: true,
        },
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
    case petsTypes.UPDATE_FILTERS: {
      return {
        ...state,
        filters: action.payload,
      }
    };
    case petsTypes.CLEAR_FILTERS: {
      return {
        ...state,
        filters: {
          type: null,
          age: null,
          coat: null,
          color: null,
          gender: null,
          location: null,   
        },
      }
    };
    case petsTypes.CLEAR_PETS: {
      return {
        ...state,
        pets: [],
        pagination: null,
        isError: false,
        loading: false,
      }
    }
    case petsTypes.NEXT_PAGE: {
      const { pagination } = state;
      if (pagination === null) return state;
      let nextPage: number = pagination.current_page + 1;
      if (nextPage > pagination.total_pages) nextPage = 1;
      return {
        ...state,
        pagination: { ...pagination, current_page: nextPage },
      }
    };
    case petsTypes.PREV_PAGE: {
      const { pagination } = state;
      if (pagination === null) return state;
      if (pagination.current_page === 1) return state;
      return {
        ...state,
        pagination: { ...pagination, current_page: pagination.current_page - 1 },
      }
    };
    case petsTypes.DELETE_PET: {
      const updatedPets = state.pets.filter(({ id }) => {
        return id !== action.payload;
      });
      return {
        ...state,
        pets: updatedPets,
      }
    };
    default: {
      return state;
    }
  }
};

export default petsReducer;