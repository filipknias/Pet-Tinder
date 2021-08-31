import { Token, StorageToken } from "./types";

export const formatToken = (token: Token): StorageToken => {
  return {
    ...token,
    expiration_time: Date.now() + (token.expires_in * 1000)
  }
}