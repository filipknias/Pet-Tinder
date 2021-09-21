import * as authTypes from "../types/authTypes";
import * as uiTypes from "../types/uiTypes";
import User from "../../models/User";
import { 
  createUserWithEmailAndPassword, 
  signOut, 
  signInWithEmailAndPassword, 
  sendEmailVerification,
  sendPasswordResetEmail, 
  updateProfile,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser as deleteUserFromFirebase,
  signInWithPopup,
  AuthProvider,
} from "firebase/auth";
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  updateDoc,
  deleteDoc,
} from "firebase/firestore"; 
import { auth, firestore, timestamp } from "../../utilities/firebase";
import { useHistory } from "react-router-dom";
import { Dispatch } from "redux";
import routes from "../../utilities/routes";
import { Credentials } from "../../pages/Auth/EditProfile";
import { formatErrorMessage } from "../../utilities/helpers";
import { Notification } from "../../types/global";
import { v4 as uuid } from "uuid";
type History = ReturnType<typeof useHistory>;

const formatDisplayName = (email: string): string => {
  return email.split("@")[0];
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
  try {
    dispatch({ type: authTypes.LOGOUT_USER_START });
    await signOut(auth);
    dispatch({ type: authTypes.LOGOUT_USER_SUCCESS });
  } catch (err: any) {
    console.log(err);
    dispatch({ 
      type: authTypes.LOGOUT_USER_START,
      payload: formatErrorMessage(err.code),
    });
  }
};

export const sendVerificationEmail = () => async (dispatch: Dispatch<authTypes.AuthActionTypes>) => {
  try {
    if (auth.currentUser === null) return;
    dispatch({ type: authTypes.VERIFY_START });
    await sendEmailVerification(auth.currentUser);
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
  dispatch({ type: authTypes.MARK_USER_VERIFIED });
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

export const sendResetPasswordEmail = (email: string) => async (dispatch: Dispatch<authTypes.AuthActionTypes>) => {
  try { 
    dispatch({ type: authTypes.RESET_PASSWORD_START });
    await sendPasswordResetEmail(auth, email);
    dispatch({
      type: authTypes.RESET_PASSWORD_SUCCESS,
      payload: "Reset password e-mail has been sent"
    });
  } catch (err: any) {
    console.log(err);
    dispatch({
      type: authTypes.RESET_PASSWORD_FAIL,
      payload: formatErrorMessage(err.code)
    });
  }
};  

export const editProfile = (email: string, displayName: string, credentials: Credentials) => async (dispatch: Dispatch<authTypes.AuthActionTypes>) => {
  try {
    if (auth.currentUser === null) return;
    if (credentials.email === null || credentials.password === null) return;
  
    dispatch({ type: authTypes.UPDATE_USER_START });

    const emailProviderCredentials = EmailAuthProvider.credential(credentials.email, credentials.password);
    await reauthenticateWithCredential(auth.currentUser, emailProviderCredentials);

    await updateProfile(auth.currentUser, { displayName });
    await updateEmail(auth.currentUser, email);

    const docRef = collection(firestore, "users");
    const q = query(docRef, where("uid", "==", auth.currentUser.uid));  
    const querySnap = await getDocs(q);
    querySnap.forEach(async (doc) => {
      if (doc.exists()) {
        await updateDoc(doc.ref, { email, displayName });
      }
    });

    dispatch({ 
      type: authTypes.UPDATE_USER_SUCCESS,
      payload: {
        message: "Your profile has been updated",
        data: {
          email,
          displayName,
        },
      },
    });
  } catch (err: any) {
    console.log(err);
    dispatch({
      type: authTypes.UPDATE_USER_FAIL,
      payload: formatErrorMessage(err.code)
    });
  }
};

export const deleteUser = (uid: string, history: History, credentials: Credentials) => async (dispatch: Dispatch<authTypes.AuthActionTypes|uiTypes.UiActionTypes>) => {
  try {
    if (auth.currentUser === null) return;
    if (credentials.email === null || credentials.password === null) return;
    dispatch({ type: authTypes.DELETE_USER_START });

    const emailProviderCredentials = EmailAuthProvider.credential(credentials.email, credentials.password);
    await reauthenticateWithCredential(auth.currentUser, emailProviderCredentials);

    await deleteUserFromFirebase(auth.currentUser);
    
    const docRef = collection(firestore, "users");
    const q = query(docRef, where("uid", "==", uid));  
    const querySnap = await getDocs(q);
    querySnap.forEach(async (doc) => {
      if (doc.exists()) {
        await deleteDoc(doc.ref);
      }
    })
    
    dispatch({ type: authTypes.DELETE_USER_SUCCESS });
    history.push(routes.index);

    const deleteUserNotification: Notification = {
      id: uuid(),
      message: "Profile has been deleted",
      type: "success",
    };
    dispatch({
      type: uiTypes.PUSH_NOTIFICATION,
      payload: deleteUserNotification,
    });
  } catch (err: any) {
    console.log(err);
    dispatch({
      type: authTypes.DELETE_USER_FAIL,
      payload: formatErrorMessage(err.code)
    });
  }
};

export const signInWithProvider = (provider: AuthProvider, history: History) => async (dispatch: Dispatch<authTypes.AuthActionTypes>) => {
  try {
    const { user } = await signInWithPopup(auth, provider);
    const userObject: User = {
      uid: user.uid,
      email: user.email ? user.email : "unknown",
      displayName: user.displayName ? user.displayName : "unknown",
      member_since: timestamp,
      verified: user.emailVerified,
    };

    // Add user to firestore
    await addDoc(collection(firestore, "users"), userObject);
    // Set in state
    dispatch({
      type: authTypes.SIGN_IN_WITH_PROVIDER_SUCCESS,
      payload: userObject,
    });
    // Redirect to index page
    history.push(routes.index);
  } catch (err: any) {
    console.log(err);
    dispatch({
      type: authTypes.SIGN_IN_WITH_PROVIDER_FAIL,
      payload: formatErrorMessage(err.code),
    });
  }
};
 