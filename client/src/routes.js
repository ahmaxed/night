import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import App from './components/App';
import Greetings from './components/Greetings';
import SignupPage from './components/signup/SignupPage';
import LoginPage from './components/login/LoginPage';
import NewEventPage from './components/events/NewEventPage';

import requireAuth from'./utils/requireAuth';

const createRoutes = () => (
    <Router>
      <App>
        <Switch>
          <Route exact path="/" component={Greetings}/>
          <Route exact path="/signup" component={SignupPage}/>
          <Route exact path="/login" component={LoginPage}/>
          <Route exact path="/new-event" component={requireAuth(NewEventPage)} />
        </Switch>
      </App>
    </Router>
);

export default createRoutes;
