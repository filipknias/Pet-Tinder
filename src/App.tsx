import React from 'react';
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

const App: React.FC = () => {
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
