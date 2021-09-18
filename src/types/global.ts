export enum Colors {
  blue = "blue",
  green = "green",
  red = "red",
  black = "black",
  white = "white",
  purple = "purple",
  yellow = "yellow"
}

export enum Placement {
  top = "top",
  bottom = "bottom"
}

export interface StorageToken extends Token {
  expiration_time: number;
}

export interface Token {
  token_type: string;
  expires_in: number;
  access_token: string;
}

export type AuthFeedbackType = "success" | "fail";

export interface AuthFeedback {
  type: AuthFeedbackType;
  message: string;
}