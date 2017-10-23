import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import App from './components/App';
import MainPage from './components/main/MainPage';
import SignupPage from './components/signup/SignupPage';
import LoginPage from './components/login/LoginPage';

const createRoutes = () => (
    <Router>
      <App>
        <Switch>
          <Route exact path="/" component={MainPage}/>
          <Route exact path="/signup" component={SignupPage}/>
          <Route exact path="/login" component={LoginPage}/>
        </Switch>
      </App>
    </Router>
);

export default createRoutes;
