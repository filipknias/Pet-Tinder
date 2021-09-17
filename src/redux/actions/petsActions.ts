import { StorageToken } from "../../types/globalTypes";
import { Dispatch } from "redux";
import * as petsTypes from "../types/petsTypes";
import { formatToken, isTokenExpired } from "../../utilities/helpers";
import axios from "axios";
const PROXY_SERVER = "https://thingproxy.freeboard.io/fetch";
const LOCAL_STORAGE_TOKEN_KEY = "PET_TINDER_TOKEN";

export const getPets = (page: number = 1) => async (dispatch: Dispatch<petsTypes.PetsActionTypes>) => {
  try {
    dispatch({ type: petsTypes.PETS_START });
    const response = await axios.get(`${PROXY_SERVER}/https://api.petfinder.com/v2/animals?page=${page}`);
    dispatch({
      type: petsTypes.PETS_SUCCESS,
      payload: {
        pets: response.data.animals,
        pagination: response.data.pagination,
      },
    });
  } catch (err) {
    dispatch({ type: petsTypes.PETS_FAIL });
    console.log(err);
  }
}

export const getToken = () => async (dispatch: Dispatch<petsTypes.PetsActionTypes>) => {
  try {
    dispatch({ type: petsTypes.TOKEN_START });

    let token: StorageToken|null = null;
    // Check if token is in localstorage
    const savedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    if (savedToken) {
      // Check if token expired, if so get new one
      const parsedToken = JSON.parse(savedToken);
      if (!isTokenExpired(parsedToken)) {
        token = parsedToken;
      }
    } else {
      const { data } = await axios.post("https://api.petfinder.com/v2/oauth2/token", {
        grant_type: "client_credentials",
        client_id: process.env.REACT_APP_API_KEY,
        client_secret: process.env.REACT_APP_SECRET_KEY,
      });
      token = formatToken(data);
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, JSON.stringify(token));
    }

    if (token === null) return;
    dispatch({ 
      type: petsTypes.TOKEN_SUCCESS,
      payload: token
    });

    axios.defaults.headers.common["Authorization"] = `Bearer ${token.access_token}`;
  } catch (err) {
    dispatch({ type: petsTypes.TOKEN_FAIL });
    console.log(err);
  }
}