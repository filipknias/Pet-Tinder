import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL, LOGOUT_USER } from "../types/authTypes";
import User from "../../models/User";
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore"; 
import { auth, firestore, timestamp } from "../../utilities/firebase";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import { AuthActionTypes } from "../../redux/types/authTypes";
import routes from "../../utilities/routes";
type History = ReturnType<typeof useHistory>;

const formatDisplayName = (email: string): string => {
  return email.split("@")[0];
};

export const registerUser = (email: string, password: string, confirmPassword: string, history: History) => async (dispatch: Dispatch<AuthActionTypes>) => {
  try {
    if (password !== confirmPassword) {
      return dispatch({
        type: AUTH_FAIL,
        payload: "Passwords must be the same",
      });
    }

    dispatch({ type: AUTH_START });

    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    const displayName = formatDisplayName(email);

    const userObject: User = {
      uid: user.uid,
      email,
      displayName,
      verified: false,
      created_at: timestamp,
    };
    // Add user to firestore
    await addDoc(collection(firestore, "users"), userObject);
    // Set user in state
    dispatch({
      type: AUTH_SUCCESS,
      payload: userObject,
    });
    // Redirect to index page
    history.push(routes.index);
    // TODO: send email verification
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
    };
    dispatch({
      type: AUTH_FAIL,
      payload: errorMessage || err.message,
    });
  }
};

export const signInUser = (email: string, password: string, history: History) => async (dispatch: Dispatch<AuthActionTypes>) => {
  try {
    dispatch({ type: AUTH_START });
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const docRef = collection(firestore, "users");
    const q = query(docRef, where("uid", "==", user.uid));  
    const querySnap = await getDocs(q);
    querySnap.forEach((doc) => {
      if (doc.exists()) {
        const user = doc.data();
        const userObject: User = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          verified: user.verified,
          created_at: user.created_at,
        };
        dispatch({
          type: AUTH_SUCCESS,
          payload: userObject
        });
        history.push(routes.index);
      }
    });
  } catch (err: any) {
    dispatch({
      type: AUTH_FAIL,
      payload: err.message,
    });
  }
};

export const logoutUser = () => async (dispatch: Dispatch<AuthActionTypes>) => {
  await signOut(auth);
  dispatch({ type: LOGOUT_USER });
};