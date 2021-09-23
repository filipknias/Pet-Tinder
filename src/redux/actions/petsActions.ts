import { query, collection, getDocs } from "firebase/firestore";
import { RootState } from "../store";
import { where } from "firebase/firestore";
import { StorageToken } from "../../types/global";
import { Pet } from "../../types/api";
import { Dispatch } from "redux";
import * as petsTypes from "../types/petsTypes";
import { formatToken, isTokenExpired } from "../../utilities/helpers";
import { firestore } from "../../utilities/firebase";
import axios from "axios";
const PROXY_SERVER = "https://thingproxy.freeboard.io/fetch";
const LOCAL_STORAGE_TOKEN_KEY = "PET_TINDER_TOKEN";

export const getPets = (page: number = 1) => async (dispatch: Dispatch<petsTypes.PetsActionTypes>, getState: () => RootState) => {
  try {
    dispatch({ type: petsTypes.PETS_START });
    const { data: { animals, pagination } } = await axios.get(`${PROXY_SERVER}/https://api.petfinder.com/v2/animals?page=${page}`);
    // Get user uid
    const user = getState().authReducer.user;
    if (user === null) return;
    // Get all likes and rejects pets id's
    // Likes
    const likedPetsQuery = where("user_id", "==", user.uid);
    const queryLikes = query(collection(firestore, "likes"), likedPetsQuery); 
    const likesQuerySnap = await getDocs(queryLikes);
    // Rejects
    const rejectsPetsQuery = where("user_id", "==", user.uid);
    const queryRejects = query(collection(firestore, "rejects"), rejectsPetsQuery); 
    const rejectsQuerySnap = await getDocs(queryRejects);

    const petsIds: number[] = [];
    rejectsQuerySnap.forEach((doc) => {
      if (doc.exists()) {
        petsIds.push(doc.data().pet_id);
      }
    }); 
    likesQuerySnap.forEach((doc) => {
      if (doc.exists()) {
        petsIds.push(doc.data().pet_id);
      }
    }); 

    // Filter pets
    const filteredPets = animals.filter((animal: Pet) => {
      if (!petsIds.some((id) => id === animal.id)) return animal; 
    });
    // Set state  
    dispatch({
      type: petsTypes.PETS_SUCCESS,
      payload: {
        pets: animals,
        pagination: {
          ...pagination,
          count_per_page: filteredPets.length,
        },
      },
    });
  } catch (err: any) {
    dispatch({ type: petsTypes.PETS_FAIL });
    console.log(err.code);
  }
}

export const getToken = () => async (dispatch: Dispatch<petsTypes.PetsActionTypes>) => {
  try {
    dispatch({ type: petsTypes.TOKEN_START });

    let token: StorageToken|null = null;
    // Check if token is in localstorage
    const savedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    if (savedToken && !isTokenExpired(JSON.parse(savedToken))) {
      // Check if token expired, if so get new one
      token = JSON.parse(savedToken);
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