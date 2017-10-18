import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';
import setAuthorizationToken from './utils/setAuthorizationToken';
import { setCurrentUser } from './actions/authActions';
import jwtDecode from 'jwt-decode';
import createRoutes from './routes';

const routes = createRoutes();

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

if (localStorage.jwtToken) {
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
  setAuthorizationToken(localStorage.jwtToken);
}


ReactDOM.render(<Provider store={store}>
  {routes}
</Provider>,
  document.getElementById('root')
);


console.log("env: " + process.env.REACT_APP_JWT_SECRET);
