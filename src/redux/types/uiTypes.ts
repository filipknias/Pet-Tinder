import { Notification } from "../../types/global";

export const PUSH_NOTIFICATION = "PUSH_NOTIFICATION";
export const DELETE_NOTIFICATION = "DELETE_NOTIFICATION";
export const CLEAR_NOTIFICATIONS = "CLEAR_NOTIFICATIONS";

interface PushNotificationAction {
  type: typeof PUSH_NOTIFICATION;
  payload: Notification;
};
interface DeleteNotificationAction {
  type: typeof DELETE_NOTIFICATION;
  payload: string;
};
interface ClearNotificationsAction {
  type: typeof CLEAR_NOTIFICATIONS;
};

export type UiActionTypes = 
                        PushNotificationAction |
                        DeleteNotificationAction |
                        ClearNotificationsAction;