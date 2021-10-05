import { Notification } from "../../types/global";

export const PUSH_NOTIFICATION = "PUSH_NOTIFICATION";
export const DELETE_NOTIFICATION = "DELETE_NOTIFICATION";
export const CLEAR_NOTIFICATIONS = "CLEAR_NOTIFICATIONS";
export const MARK_COOKIES_ACCEPTED = "MARK_COOKIES_ACCEPTED";
export const MARK_API_INFORMATION_CLOSED = "MARK_API_INFORMATION_CLOSED";

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
interface MarkCookiesAcceptedAction {
  type: typeof MARK_COOKIES_ACCEPTED;
}
interface MarkApiInformationClosedAction {
  type: typeof MARK_API_INFORMATION_CLOSED;
}

export type UiActionTypes = 
                        PushNotificationAction |
                        DeleteNotificationAction |
                        ClearNotificationsAction |
                        MarkCookiesAcceptedAction |
                        MarkApiInformationClosedAction;