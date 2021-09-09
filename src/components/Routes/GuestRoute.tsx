import React from 'react';
import { Redirect, Route } from "react-router-dom";
import routes from "../../utilities/routes";

interface Props {
  component: React.ComponentType<any>;
  isAuth: boolean;
  path: string;
};

const GuestRoute: React.FC<Props> = ({ component: Component, isAuth, path, ...rest }) => {
  return (
    <Route {...rest} path={path} render={(props) => !isAuth ? <Component {...props} /> : <Redirect to={routes.index} />} />
  )
}

export default GuestRoute;
