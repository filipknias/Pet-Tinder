import React from 'react';
import './styles/index.scss';
import Header from "./components/Header/Header";
import { Provider } from "react-redux";
import store from "./redux/store";
import IndexPage from "./pages/Index/IndexPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="container">
        <Header />
        <div className="container__main">
          <Router>
              <Switch>
                <Route path="/" component={IndexPage} exact />
              </Switch>
          </Router>
        </div>
      </div>
    </Provider>
  );
}

export default App;
