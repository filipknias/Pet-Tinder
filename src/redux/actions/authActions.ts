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

const formatErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case "auth/email-already-in-use" || "auth/email-already-exists": {
      return "Email already in use";
    };
    case "auth/weak-password" || "auth/invalid-password": {
      return "Password is too weak";
    };
    case "auth/invalid-email" : {
      return "E-mail must be valid";
    };
    case "auth/wrong-password" || "auth/user-not-found": {
      return "Wrong e-mail or password"
    };
    default: {
      return "Something went wrong";
    };
  };
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
      member_since: timestamp,
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
    console.log(err.code);
    dispatch({
      type: AUTH_FAIL,
      payload: formatErrorMessage(err.code)
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
          member_since: user.created_at,
        };
        dispatch({
          type: AUTH_SUCCESS,
          payload: userObject
        });
        history.push(routes.index);
      }
    });
  } catch (err: any) {
    console.log(err.code);
    dispatch({
      type: AUTH_FAIL,
      payload: formatErrorMessage(err.code),
    });
  }
};

export const logoutUser = () => async (dispatch: Dispatch<AuthActionTypes>) => {
  await signOut(auth);
  dispatch({ type: LOGOUT_USER });
};