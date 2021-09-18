import { Token, StorageToken } from "../types/global";

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