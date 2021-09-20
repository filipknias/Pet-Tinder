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
import { collection, where } from "firebase/firestore"; 
import GuestRoute from './components/Routes/GuestRoute';
import ProtectedRoute from './components/Routes/ProtectedRoute';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { verifyUser } from "./redux/actions/authActions";
import { getToken } from "./redux/actions/petsActions";
import { pushNotification } from "./redux/actions/uiActions";
import useFirestore from "./hooks/useFirestore";
import Notification from "./components/Notification/Notification";
import { Notification as NotificationInterface } from "./types/global";
import { formatErrorMessage } from './utilities/helpers';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state: RootState) => state.authReducer);
  const { notifications } = useSelector((state: RootState) => state.uiReducer);
  const { getQueriedItems }  = useFirestore(firestore);

  const getUserAndSetInState = async (uid: string) => {
    try {
      const userDocRef = collection(firestore, "users");
      const userQuery = where("uid", "==", uid);
      const dbUser = await getQueriedItems(userDocRef, userQuery);

      dispatch({
        type: authTypes.AUTH_SUCCESS,
        payload: dbUser[0]
      });
    } catch (err: any) {
      const errorNotification: NotificationInterface = {
        id: 1,
        message: formatErrorMessage(err.code),
        type: "fail",
        duration: 1500,
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
    }
  }, [auth.currentUser?.emailVerified]);

  return (
    <Router>
      <div className="container">
        <div className="container__notifications">
          {notifications.map((notification) => (
            <Notification notification={notification} key={notification.id} />
          ))}
        </div>
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
