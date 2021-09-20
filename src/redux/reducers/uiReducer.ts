import * as uiTypes from "../types/uiTypes";
import { Notification } from "../../types/global";

interface UiState {
  notifications: Notification[];
};

const initialState: UiState = {
  notifications: [],
};

const MAX_NOTIFICATIONS_TO_SHOW = 3;

const uiReducer = (state: UiState = initialState, action: uiTypes.UiActionTypes): UiState => {
  switch (action.type) {
    case uiTypes.PUSH_NOTIFICATION: {
      if (state.notifications.length === MAX_NOTIFICATIONS_TO_SHOW) {
        return {
          ...state,
          notifications: [
            action.payload,
            ...state.notifications.slice(1),
          ],
        }
      } else {
        return {
          ...state,
          notifications: [
            ...state.notifications,
            action.payload,
          ],
        }
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
    case uiTypes.CLEAR_OUT: {
      return {
        ...state,
        notifications: [],
      }
    };
    default: return state;
  }
};

export default uiReducer;