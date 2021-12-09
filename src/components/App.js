import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Login from "./Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LoadingBar } from "react-redux-loading";
import HomePage from "./HomePage";
import PollQuestion from "./PollQuestion";

let loggedId = false;

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      loggedId === true ? <Component {...props} /> : <Login />
    }
  />
);

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    console.log("app: ", this.props);
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          {!this.props.loading && (
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/login" component={Login} />
              <PrivateRoute
                exact
                path="/question/:id"
                component={PollQuestion}
              />
            </Switch>
          )}
        </Fragment>
      </Router>
    );
  }
}

// function mapStateToProps({ setAuthedUser, questions, users }) {
//   if (users && setAuthedUser) {
//     const unansweredIds = [];
//     const answeredIds = Object.keys(users[setAuthedUser].answers);
//     const questionsId = Object.keys(questions).sort(
//       (a, b) => questions[b].timestamp - questions[a].timestamp
//     );

//     questionsId.map(
//       (id) => answeredIds.includes(id) === false && unansweredIds.push(id)
//     );
//     answeredIds.sort((a, b) => questions[b] - questions[a]);
//     return {
//       setAuthedUser,
//       answeredIds,
//       unansweredIds,
//     };
//   }
//   return {
//     setAuthedUser,
//   };
// }

function mapStateToProps({ questions, setAuthedUser }) {
  return {
    loading: questions === null,
    loggedIn: setAuthedUser !== null,
  };
}

export default connect(mapStateToProps)(App);
