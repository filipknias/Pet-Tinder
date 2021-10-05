import { Token, StorageToken } from "../types/global";
import { v4 as uuid } from 'uuid';

export const formatToken = (token: Token): StorageToken => {
  return {
    ...token,
    expiration_time: Date.now() + (token.expires_in * 1000)
  }
}

export const isTokenExpired = (token: StorageToken): boolean => {
  if (Date.now() > token.expiration_time) return true;
  else return false;
}

export const formatErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case "auth/email-already-in-use": 
    case "auth/email-already-exists": {
      return "Email already in use";
    };
    case "auth/weak-password":
    case "auth/invalid-password": {
      return "Password is too weak";
    };
    case "auth/invalid-email" : {
      return "E-mail must be valid";
    };
    case "auth/wrong-password":
    case "auth/user-not-found": {
      return "Wrong e-mail or password"
    };
    case "auth/user-mismatch": {
      return "Wrong user credentials";
    };
    default: {
      return "Something went wrong";
    };
  };
};