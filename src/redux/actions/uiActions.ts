import * as uiTypes from "../types/uiTypes";
import { Dispatch } from "redux";
import { Notification } from "../../types/global";

export const pushNotification = (notification: Notification) => async (dispatch: Dispatch<uiTypes.UiActionTypes>) => {
  dispatch({
    type: uiTypes.PUSH_NOTIFICATION,
    payload: notification,
  });
};

export const deleteNotification = (id: string) => async (dispatch: Dispatch<uiTypes.UiActionTypes>) => {
  dispatch({
    type: uiTypes.DELETE_NOTIFICATION,
    payload: id,
  });
};