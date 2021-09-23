import React, { useEffect } from 'react';
import './styles/index.scss';
import Header from "./components/Header/Header";
import IndexPage from "./pages/Index/IndexPage";
import LoginPage from "./pages/Auth/Login";
import RegisterPage from "./pages/Auth/Register";
import ProfilePage from "./pages/Profile/ProfilePage";
import EditProfile from "./pages/Auth/EditProfile";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import routes from "./utilities/routes";
import { auth, firestore } from "./utilities/firebase"; 
import * as authTypes from "./redux/types/authTypes";
import { where } from "firebase/firestore"; 
import GuestRoute from './components/Routes/GuestRoute';
import ProtectedRoute from './components/Routes/ProtectedRoute';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { verifyUser } from "./redux/actions/authActions";
import { getToken } from "./redux/actions/petsActions";
import { pushNotification } from "./redux/actions/uiActions";
import useFirestore from "./hooks/useFirestore";
import { Notification as NotificationInterface } from "./types/global";
import { formatErrorMessage } from './utilities/helpers';
import { v4 as uuid } from "uuid";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state: RootState) => state.authReducer);
  const { getQueriedItems }  = useFirestore(firestore);

  const getUserAndSetInState = async (uid: string) => {
    try {
      const userQuery = where("uid", "==", uid);
      const dbUser = await getQueriedItems("users", userQuery);
      if (!dbUser) return;

      dispatch({
        type: authTypes.AUTH_SUCCESS,
        payload: dbUser[0]
      });

      const userNotification: NotificationInterface = {
        id: uuid(),
        message: `Signed in as ${dbUser[0].email}`,
        type: "info",
      };
      dispatch(pushNotification(userNotification));
    } catch (err: any) {
      const errorNotification: NotificationInterface = {
        id: uuid(),
        message: formatErrorMessage(err.code),
        type: "fail",
      };
      dispatch(pushNotification(errorNotification));
    }
  };  

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        getUserAndSetInState(user.uid);
      }
    });
    dispatch(getToken());
  }, []);

  useEffect(() => {
    if (auth.currentUser && auth.currentUser.emailVerified) {
      if (user === null) return;
      dispatch(verifyUser(user));
      const emailVerifyNotification: NotificationInterface = {
        id: uuid(),
        message: "Profile is now verified",
        type: "info"
      };
      dispatch(pushNotification(emailVerifyNotification));
    }
  }, [auth.currentUser?.emailVerified]);

  return (
    <Router>
      <div className="container">
        <Header />
        <div className="container__main">
          <Switch>
            <Route path={routes.index} exact component={IndexPage} />
            <ProtectedRoute path={routes.profile} isAuth={isAuth} component={ProfilePage} />
            <ProtectedRoute path={routes.editProfile} isAuth={isAuth} component={EditProfile} />
            <GuestRoute path={routes.signIn} isAuth={isAuth} component={LoginPage} />
            <GuestRoute path={routes.register} isAuth={isAuth} component={RegisterPage} />
            <GuestRoute path={routes.forgotPassword} isAuth={isAuth} component={ForgotPassword} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
