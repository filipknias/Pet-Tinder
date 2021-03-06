import { query, collection, getDocs, deleteDoc, orderBy } from "firebase/firestore";
import { RootState } from "../store";
import { where } from "firebase/firestore";
import { StorageToken, Filters } from "../../types/global";
import { Pet } from "../../types/api";
import { Dispatch } from "redux";
import * as petsTypes from "../types/petsTypes";
import { formatToken, isTokenExpired } from "../../utilities/helpers";
import { firestore } from "../../utilities/firebase";
import axios, { CancelToken } from "axios";
import { LOCAL_STORAGE_TOKEN_KEY } from "../../types/constants";

const generateApiQuery = (filters: Filters) => {
  const keyValuePairs = Object.entries(filters).filter(([key, value]) => value !== null).map(([key, value]) => {
    return `${key}=${value}`;
  });
  const queryString = keyValuePairs.join("&");
  return queryString;
};

const limitLikeAndRejectedPets = async (uid: string, pets: Pet[]) => {
    // Get all likes and rejects pets id's
    // Likes
    const likedPetsQuery = where("user_id", "==", uid);
    const queryLikes = query(collection(firestore, "likes"), likedPetsQuery); 
    const likesQuerySnap = await getDocs(queryLikes);
    // Rejects
    const rejectsPetsQuery = where("user_id", "==", uid);
    const queryRejects = query(collection(firestore, "rejects"), rejectsPetsQuery); 
    const rejectsQuerySnap = await getDocs(queryRejects);
    // Get liked or rejected ids
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
    // Filter data
    const filteredPets = pets.filter((animal: Pet) => {
      if (!petsIds.some((id) => id === animal.id)) return animal; 
    });

    return filteredPets;
};

export const getPets = (page: number = 1, filters: Filters, cancelToken?: CancelToken) => async (dispatch: Dispatch<petsTypes.PetsActionTypes>, getState: () => RootState) => {
  try {
    dispatch({ type: petsTypes.PETS_START });
    const queryParams = `page=${page}&${generateApiQuery(filters)}`;
    const { data: { animals, pagination } } = await axios.get(`https://api.petfinder.com/v2/animals?${queryParams}`, { cancelToken });
    // Get user uid
    const user = getState().authReducer.user;
    let petsData: Pet[] = animals;
    if (user) {
      petsData = await limitLikeAndRejectedPets(user.uid, animals);
    }
    // Set state  
    dispatch({
      type: petsTypes.PETS_SUCCESS,
      payload: {
        pets: petsData,
        pagination: {
          ...pagination,
          count_per_page: petsData.length,
        },
      },
    });
  } catch (err: any) {
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

export const getLikedPets = (uid: string, cancelToken?: CancelToken) => async (dispatch: Dispatch<petsTypes.PetsActionTypes>) => {
  try {
    dispatch({ type: petsTypes.LIKES_START });
    // Get pet ids from db
    const petsQuery = where("user_id", "==", uid);
    const petsLikesQuery = query(collection(firestore, "likes"), petsQuery, orderBy("created_at", "desc"));
    const petsLikes = await getDocs(petsLikesQuery);
    // Put ids to array
    const petsIds: number[] = [];
    petsLikes.forEach((doc) => {
      if (doc.exists()) {
        petsIds.push(doc.data().pet_id);
      }
    });
    // Get pets from api
    const petsPromises = petsIds.map(async (id) => {
      const { data: { animal } } = await axios.get(`https://api.petfinder.com/v2/animals/${id}`, { cancelToken });
      return animal;
    })
    const pets = await Promise.all(petsPromises);
    // Set in state
    dispatch({
      type: petsTypes.LIKES_SUCCESS,
      payload: pets,
    });
    
  } catch (err: any) {
    dispatch({ type: petsTypes.LIKES_FAIL });
    console.log(err);
  }
};

export const deletePet = (petId: number) => async (dispatch: Dispatch<petsTypes.PetsActionTypes>) => {
  try {
    const petQuery = where("pet_id", "==", petId);
    const q = query(collection(firestore, "likes"), petQuery); 
    const docs = await getDocs(q);
    docs.forEach(async (doc) => {
      if (doc.exists()) {
        await deleteDoc(doc.ref);
        dispatch({ 
          type: petsTypes.DELETE_PET,
          payload: doc.data().pet_id,
        });
      }
    });
  } catch (err: any) {
    dispatch({ type: petsTypes.LIKES_FAIL });
    console.log(err);
  }
};