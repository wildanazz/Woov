import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import { fetchUserId } from '../../actions';
import history from '../../history';
import Header from '../Header/Header';
import Landing from '../Landing/Landing';
import SignIn from '../SignIn/SignIn';
import FormEmail from '../FormEmail/FormEmail';
import FormResetPassword from '../FormResetPassword/FormResetPassword';
import SignUp from '../SignUp/SignUp';
import Profile from '../Profile/Profile';

const App = (props) => {
  const { fetchUserIdConnect } = props;

  useEffect(() => {
    fetchUserIdConnect();
  });

  return (
    <div>
      <Router history={history}>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/signin" exact component={SignIn} />
            <Route path="/reset/confirm/email" exact component={FormEmail} />
            <Route
              path="/reset/password/:resetPasswordToken"
              exact
              component={FormResetPassword}
            />
            <Route path="/confirm/:confirmationCode" exact component={SignIn} />
            <Route path="/profile" exact component={Profile} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default connect(null, { fetchUserIdConnect: fetchUserId })(App);
