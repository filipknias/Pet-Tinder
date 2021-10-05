import * as uiTypes from "../types/uiTypes";
import { Notification } from "../../types/global";

interface UiState {
  notifications: Notification[];
  cookiesAccepted: boolean;
  apiInformationClosed: boolean;
};

const initialState: UiState = {
  notifications: [],
  cookiesAccepted: false,
  apiInformationClosed: false,
};

const uiReducer = (state: UiState = initialState, action: uiTypes.UiActionTypes): UiState => {
  switch (action.type) {
    case uiTypes.PUSH_NOTIFICATION: {
      return {
        ...state,
        notifications: [
          ...state.notifications,
          action.payload,
        ],
      }
    };
    case uiTypes.DELETE_NOTIFICATION: {
      const notifications = state.notifications.filter(({ id }) => {
        return id !== action.payload;
      });
      return {
        ...state,
        notifications,
      }
    };
    case uiTypes.CLEAR_NOTIFICATIONS: {
      return {
        ...state,
        notifications: [],
      }
    };
    case uiTypes.MARK_COOKIES_ACCEPTED: {
      return {
        ...state,
        cookiesAccepted: true,
      }
    };
    case uiTypes.MARK_API_INFORMATION_CLOSED: {
      return {
        ...state,
        apiInformationClosed: true,
      }
    };
    default: return state;
  }
};

export default uiReducer;