import { Dispatch } from "redux";
import { PetsActionTypes } from "../../redux/types/petsTypes";
import { SET_PETS, SET_PAGINATION, SET_LOADING, SET_ERROR, SET_TOKEN } from "../types/petsTypes";
import { formatToken } from "../../utilities/helpers";
import axios from "axios";
const PROXY_SERVER = "https://thingproxy.freeboard.io/fetch";

export const getPets = (page: number = 1) => async (dispatch: Dispatch<PetsActionTypes>) => {
  dispatch({ type: SET_ERROR, payload: false });
  dispatch({ type: SET_LOADING, payload: true });

  try {
    const response = await axios.get(`${PROXY_SERVER}/https://api.petfinder.com/v2/animals?page=${page}`);
    dispatch({ type: SET_PETS, payload: response.data.animals });
    dispatch({ type: SET_PAGINATION, payload: response.data.pagination });
  } catch (err) {
    dispatch({ type: SET_ERROR, payload: true });
    console.log(err);
  }

  dispatch({ type: SET_LOADING, payload: false });
}

export const getToken = () => async (dispatch: Dispatch<PetsActionTypes>) => {
  dispatch({ type: SET_ERROR, payload: false });
  dispatch({ type: SET_LOADING, payload: true });

  try {
    const response = await axios.post("https://api.petfinder.com/v2/oauth2/token", {
      grant_type: "client_credentials",
      client_id: process.env.REACT_APP_API_KEY,
      client_secret: process.env.REACT_APP_SECRET_KEY
    });
    dispatch({ type: SET_TOKEN, payload: formatToken(response.data) });
  } catch (err) {
    dispatch({ type: SET_ERROR, payload: true });
    console.log(err);
  }

  dispatch({ type: SET_LOADING, payload: false });
}