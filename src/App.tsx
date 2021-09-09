import React, { useState, useEffect } from 'react';
import './styles/index.scss';
import Header from "./components/Header/Header";
import { Provider } from "react-redux";
import store from "./redux/store";
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
import { AUTH_SUCCESS } from "./redux/types/authTypes";
import User from "./models/User";
import { collection, query, where,getDocs } from "firebase/firestore"; 
import GuestRoute from './components/Routes/GuestRoute';
import ProtectedRoute from './components/Routes/ProtectedRoute';

const App: React.FC = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const getUserAndSetInState = async (uid: string) => {
    const docRef = collection(firestore, "users");
    const q = query(docRef, where("uid", "==", uid));  
    const querySnap = await getDocs(q);
    // TODO: try catch block
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
        store.dispatch({
          type: AUTH_SUCCESS,
          payload: userObject
        });
      }
    });
  };  

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        getUserAndSetInState(user.uid);
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
  }, []); 

  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
