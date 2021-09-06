import React, { useEffect } from 'react';
import './styles/index.scss';
import Header from "./components/Header/Header";
import { Provider } from "react-redux";
import store from "./redux/store";
import IndexPage from "./pages/Index/IndexPage";
import LoginPage from "./pages/Auth/Login";
import RegisterPage from "./pages/Auth/Register";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import routes from "./utilities/routes";
import { auth, firestore } from "./utilities/firebase"; 
import { SET_USER } from "./redux/types/authTypes";
import User from "./utilities/models/User";
import { collection, query, where,getDocs } from "firebase/firestore"; 

const App: React.FC = () => {
  const getUserAndSetInState = async (uid: string) => {
    const docRef = collection(firestore, "users");
    const q = query(docRef, where("uid", "==", uid));  
    const querySnap = await getDocs(q);
    querySnap.forEach((doc) => {
      if (doc.exists()) {
        const user = doc.data();
        const userObject: User = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          created_at: user.created_at,
        };
        store.dispatch({
          type: SET_USER,
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
  }, []); 

  return (
    <Provider store={store}>
      <Router>
        <div className="container">
          <Header />
          <div className="container__main">
            <Switch>
              <Route path={routes.index} exact component={IndexPage} />
              <Route path={routes.signIn} component={LoginPage} />
              <Route path={routes.register} component={RegisterPage} />
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
