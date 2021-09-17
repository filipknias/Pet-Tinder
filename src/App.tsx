import React, { useEffect } from 'react';
import './styles/index.scss';
import Header from "./components/Header/Header";
import IndexPage from "./pages/Index/IndexPage";
import LoginPage from "./pages/Auth/Login";
import RegisterPage from "./pages/Auth/Register";
import ProfilePage from "./pages/Profile/ProfilePage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import routes from "./utilities/routes";
import { auth, firestore } from "./utilities/firebase"; 
import * as authTypes from "./redux/types/authTypes";
import User from "./models/User";
import { collection, query, where, getDocs } from "firebase/firestore"; 
import GuestRoute from './components/Routes/GuestRoute';
import ProtectedRoute from './components/Routes/ProtectedRoute';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { verifyUser } from "./redux/actions/authActions";
import { getToken } from "./redux/actions/petsActions";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state: RootState) => state.authReducer);

  const getUserAndSetInState = async (uid: string) => {
    const docRef = collection(firestore, "users");
    const q = query(docRef, where("uid", "==", uid));  
    const querySnap = await getDocs(q);
    // TODO: try catch block
    querySnap.forEach((doc) => {
      if (doc.exists()) {
        const dbUser = doc.data();
        const userObject: User = {
          uid: dbUser.uid,
          email: dbUser.email,
          displayName: dbUser.displayName,
          verified: dbUser.verified,
          member_since: dbUser.member_since,
        };
        dispatch({
          type: authTypes.AUTH_SUCCESS,
          payload: userObject
        });
      }
    });
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

  // TODO: think about creating useFirebase hook

  return (
    <Router>
      <div className="container">
        <Header />
        <div className="container__main">
          <Switch>
            <Route path={routes.index} exact component={IndexPage} />
            <ProtectedRoute path={routes.profile} isAuth={isAuth} component={ProfilePage} />
            <GuestRoute path={routes.signIn} isAuth={isAuth} component={LoginPage} />
            <GuestRoute path={routes.register} isAuth={isAuth} component={RegisterPage} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
