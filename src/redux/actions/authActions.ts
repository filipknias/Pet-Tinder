import * as authTypes from "../types/authTypes";
import User from "../../models/User";
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { collection, addDoc, query, where, getDocs, updateDoc, doc } from "firebase/firestore"; 
import { auth, firestore, timestamp } from "../../utilities/firebase";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import routes from "../../utilities/routes";
type History = ReturnType<typeof useHistory>;
type CurrentUser = typeof auth.currentUser;

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

export const registerUser = (email: string, password: string, confirmPassword: string, history: History) => async (dispatch: Dispatch<authTypes.AuthActionTypes>) => {
  try {
    if (password !== confirmPassword) {
      return dispatch({
        type: authTypes.AUTH_FAIL,
        payload: "Passwords must be the same",
      });
    }

    dispatch({ type: authTypes.AUTH_START });

    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    const displayName = formatDisplayName(email);

    const userObject: User = {
      uid: user.uid,
      email,
      displayName,
      verified: auth.currentUser?.emailVerified || false,
      member_since: timestamp,
    };
    // Add user to firestore
    await addDoc(collection(firestore, "users"), userObject);
    // Set user in state
    dispatch({
      type: authTypes.AUTH_SUCCESS,
      payload: userObject,
    });
    // Redirect to index page
    history.push(routes.index);
    
    // Send email verification
    await sendEmailVerification(user);
    // TODO: Show popup message with email verification has been send
  } catch (err: any) {
    console.log(err.code);
    dispatch({
      type: authTypes.AUTH_FAIL,
      payload: formatErrorMessage(err.code)
    });
  }
};

export const signInUser = (email: string, password: string, history: History) => async (dispatch: Dispatch<authTypes.AuthActionTypes>) => {
  try {
    dispatch({ type: authTypes.AUTH_START });
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
          type: authTypes.AUTH_SUCCESS,
          payload: userObject
        });
        history.push(routes.index);
      }
    });
  } catch (err: any) {
    console.log(err.code);
    dispatch({
      type: authTypes.AUTH_FAIL,
      payload: formatErrorMessage(err.code),
    });
  }
};

export const logoutUser = () => async (dispatch: Dispatch<authTypes.AuthActionTypes>) => {
  // TODO: set logout loading and error
  await signOut(auth);
  dispatch({ type: authTypes.LOGOUT_USER });
};

export const sendVerificationEmail = (user: CurrentUser) => async (dispatch: Dispatch<authTypes.AuthActionTypes>) => {
  try {
    if (user === null) return;
    dispatch({ type: authTypes.VERIFY_START });
    await sendEmailVerification(user);
    dispatch({ 
      type: authTypes.VERIFY_SUCCESS,
      payload: "E-mail verification has been sent", 
    });
  } catch (err: any) {
    console.log(err.code);
    dispatch({
      type: authTypes.VERIFY_FAIL,
      payload: formatErrorMessage(err.code)
    });
  }
};

export const verifyUser = (user: User) => async (dispatch: Dispatch<authTypes.AuthActionTypes>) => {
  dispatch({
    type: authTypes.UPDATE_USER,
    payload: {
      ...user,
      verified: true,
    }
  });
  try {
    const usersRef = collection(firestore, "users");
    const q = query(usersRef, where("uid", "==", user.uid));  
    const querySnap = await getDocs(q);
    querySnap.forEach(async (doc) => {
      if (doc.exists()) {
        await updateDoc(doc.ref, {
          verified: true,
        });
      }
    });
  } catch (err: any) {
    console.log(err);
  }
};  