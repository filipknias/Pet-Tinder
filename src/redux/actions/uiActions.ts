import * as uiTypes from "../types/uiTypes";
import { Dispatch } from "redux";
import { Notification } from "../../types/global";

export const pushNotification = (notification: Notification) => async (dispatch: Dispatch<uiTypes.UiActionTypes>) => {
  dispatch({
    type: uiTypes.PUSH_NOTIFICATION,
    payload: notification,
  });
  setTimeout(() => {
    dispatch({
      type: uiTypes.DELETE_NOTIFICATION,
      payload: notification.id,
    });
  }, notification.duration);
};

export const deleteNotification = (id: number) => async (dispatch: Dispatch<uiTypes.UiActionTypes>) => {
  dispatch({
    type: uiTypes.DELETE_NOTIFICATION,
    payload: id,
  });
};