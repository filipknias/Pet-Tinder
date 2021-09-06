import { SET_USER, SET_ERROR, SET_LOADING } from "../types/authTypes";
import User from "../../utilities/models/User";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore"; 
import { auth, firestore, timestamp } from "../../utilities/firebase";
import { useHistory } from "react-router-dom";
import routes from "../../utilities/routes";
import { Dispatch } from "redux";
import { AuthActionTypes } from "../../redux/types/authTypes";
type History = ReturnType<typeof useHistory>;

const formatDisplayName = (email: string): string => {
  return email.split("@")[0];
};

export const registerUser = (email: string, password: string, confirmPassword: string, history: History) => async (dispatch: Dispatch<AuthActionTypes>) => {
  try {
    dispatch({ type: SET_ERROR, payload: null });
    if (password !== confirmPassword) {
      return dispatch({
        type: SET_ERROR,
        payload: "Passwords must be the same",
      });
    }

    dispatch({ type: SET_LOADING, payload: true });
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    const displayName = formatDisplayName(email);

    // TODO: add models interfaces files
    const userObject: User = {
      uid: user.uid,
      email,
      displayName,
      created_at: timestamp,
    };
    // Add user to firestore
    await addDoc(collection(firestore, "users"), userObject);
    // Set user in state
    dispatch({
      type: SET_USER,
      payload: userObject,
    });
    // Redirect to index page
    history.push(routes.index);
  } catch (err: any) {
    let errorMessage = null;
    switch (err.code) {
      case "auth/email-already-in-use" || "auth/email-already-exists": {
        errorMessage = "Email already in use";
        break;
      };
      case "auth/weak-password": {
        errorMessage = "Password is too weak";
        break;
      };
      case "auth/invalid-email" : {
        errorMessage = "E-mail must be valid";
        break;
      }
    }
    dispatch({
      type: SET_ERROR,
      payload: errorMessage || err.message,
    });
  }
  dispatch({ type: SET_LOADING, payload: false });
};

export const signInUser = () => async (dispatch: Dispatch<AuthActionTypes>) => {
  
};