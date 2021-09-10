import { Dispatch } from "redux";
import * as petsTypes from "../types/petsTypes";
import { formatToken } from "../../utilities/helpers";
import axios from "axios";
const PROXY_SERVER = "https://thingproxy.freeboard.io/fetch";

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
    const response = await axios.post("https://api.petfinder.com/v2/oauth2/token", {
      grant_type: "client_credentials",
      client_id: process.env.REACT_APP_API_KEY,
      client_secret: process.env.REACT_APP_SECRET_KEY
    });
    dispatch({ 
      type: petsTypes.TOKEN_SUCCESS,
      payload: formatToken(response.data)
    });
  } catch (err) {
    dispatch({ type: petsTypes.TOKEN_FAIL });
    console.log(err);
  }
}