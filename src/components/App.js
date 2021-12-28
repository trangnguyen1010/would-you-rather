import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Login from "./Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LoadingBar } from "react-redux-loading";
import HomePage from "./HomePage";
import PollQuestion from "./PollQuestion";
import PollQuestionNew from "./PollQuestionNew";
import Leaderboard from "./Leaderboard";
import SiteWrapper from "./SiteWrapper";

const App = ({ authedUser, loading, dispatch }) => {
  const PrivateRoute = ({
    component: Component,
    setAuthenticated,
    ...rest
  }) => (
    <Route
      {...rest}
      render={(props) =>
        setAuthenticated === true ? <Component {...props} /> : <Login />
      }
    />
  );
  useEffect(() => {
    dispatch(handleInitialData());
  }, []);

  return (
    <Router>
      <Fragment>
        <LoadingBar />
        {authedUser !== null && <SiteWrapper />}
        {!loading && (
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={Login} />

            <PrivateRoute
              exact
              path="/question/:id"
              setAuthenticated={authedUser !== null}
              component={PollQuestion}
            />
            <PrivateRoute
              setAuthenticated={authedUser !== null}
              exact
              path="/add"
              component={PollQuestionNew}
            />
            <PrivateRoute
              setAuthenticated={authedUser !== null}
              exact
              path="/leaderboard"
              component={Leaderboard}
            />
          </Switch>
        )}
      </Fragment>
    </Router>
  );
};

function mapStateToProps(state) {
  return {
    authedUser: state.setAuthedUser,
    loading: state.questions === null,
    users: state.users,
  };
}

export default connect(mapStateToProps)(App);
