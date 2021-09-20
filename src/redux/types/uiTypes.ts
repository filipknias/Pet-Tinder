import { Notification } from "../../types/global";

export const PUSH_NOTIFICATION = "PUSH_NOTIFICATION";
export const DELETE_NOTIFICATION = "DELETE_NOTIFICATION";
export const CLEAR_OUT = "CLEAR_OUT";

interface PushNotificationAction {
  type: typeof PUSH_NOTIFICATION;
  payload: Notification;
};
interface DeleteNotificationAction {
  type: typeof DELETE_NOTIFICATION;
  payload: number;
};
interface ClearOutAction {
  type: typeof CLEAR_OUT;
};

export type UiActionTypes = 
                        PushNotificationAction |
                        DeleteNotificationAction |
                        ClearOutAction;