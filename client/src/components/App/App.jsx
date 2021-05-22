import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import { fetchUserId } from '../../actions';
import history from '../../history';
import Header from '../Header/Header';
import Landing from '../Landing/Landing';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';

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
            <Route exact path="/" component={Landing} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default connect(null, { fetchUserIdConnect: fetchUserId })(App);
