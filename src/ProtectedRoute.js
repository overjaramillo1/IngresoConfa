import React from 'react';
import { Route, Redirect } from 'react-router-dom';
//import jwt from 'jsonwebtoken';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('accessToken');


console.log('isAuthenticated :>> protec>> ', isAuthenticated);
  if (!isAuthenticated) {
    console.log('isAuthenticated :>> ingreso>> ', isAuthenticated);
    // Mostrar mensaje si el token no está presente
    return <div>Debe iniciar sesión para acceder a esta página.</div>;
  } else {
   // const decodedToken = jwt.decode(isAuthenticated);
   console.log('isAuthenticated :>> muestr>> ', isAuthenticated);

    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
            to={{
               pathname: '/login',
                state: { from: props.location },
               }} >
                 <div>Debe iniciar sesión para acceder a esta página.</div>
          </Redirect>
          )
        }
      />
    );
  };
}
export default ProtectedRoute;
