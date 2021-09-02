import React from 'react';
import './styles/index.scss';
import Header from "./components/Header/Header";
import { Provider } from "react-redux";
import store from "./redux/store";
import IndexPage from "./pages/Index/IndexPage";
import SignInPage from "./pages/Login/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="container">
          <Header />
          <div className="container__main">
            <Switch>
              <Route path="/" exact component={IndexPage} />
              <Route path="/sign-in" component={SignInPage} />
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
