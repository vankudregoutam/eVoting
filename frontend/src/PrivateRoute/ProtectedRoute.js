// import React from 'react';
// import { useLocalState } from '../util/useLocalStorage';
// import { Navigate } from 'react-router-dom';

// const PrivateRoute = ({ children }) => {

//     const [jwt, setJWT] = useLocalState('', 'jwt');
//     return jwt ? children : <Navigate to='/admin' />
// }

// export default PrivateRoute

// import { Route, Navigate } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "./AuthContext";

// function PrivateRoute({ component: Component, ...rest }) {
//   const { isAuthenticated } = useContext(AuthContext);

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isAuthenticated ? (
//           <Component {...props} />
//         ) : (
//           <Navigate to="/login" />
//         )
//       }
//     />
//   );
// }

// export default PrivateRoute;

import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ auth, component: Component, ...rest }) => {
  return (
    <Route {...rest} render={(props) => {
      if (auth) return <Component {...props} />
      if (!auth) return (<Navigate to={{ path: '/admin', state: { from: props.location } }} />);
    }} />
  )
}

export default ProtectedRoute;