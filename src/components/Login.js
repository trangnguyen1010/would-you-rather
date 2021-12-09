import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { Grid, Form, Button, Text, Page } from "tabler-react";
import logo from "../assets/logo.svg";

class Login extends Component {
  state = {
    authedUser: "",
  };

  handleChange = (e) => {
    e.preventDefault();
    let authedUser = e.target.value;
    authedUser = authedUser.toLowerCase().split(" ").join("");
    this.setState({ authedUser: authedUser });
  };

  handleAuthedUser = () => {
    this.props.dispatch(setAuthedUser(this.state.authedUser));

    let prevRoutePath =
      this.props.location.state !== undefined
        ? this.props.location.state.previous.pathname
        : null;

    prevRoutePath
      ? this.props.history.push(prevRoutePath)
      : this.props.history.push("/");
  };

  render() {
    const { users } = this.props;
    console.log("Logg page: ", this.state.authedUser);

    return (
      <Page>
        <div className="container">
          <div className="row">
            <Grid.Col>
              <div className="text-center mb-6">
                <img src={logo} alt="logo" />
              </div>
              <div>
                <Form className="card" autoComplete="off">
                  <div>
                    <div>
                      <p>Login to your account</p>
                    </div>
                    <div>
                      <Form.Group label="Select User  ">
                        <Form.Select
                          onChange={this.handleChange}
                          value={this.state.authedUser}
                          position="append"
                        >
                          <option value="" default disabled defaultValue>
                            Select User{" "}
                          </option>
                          {users.map((user) => (
                            <option key={user.name}>{user.name}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                      <Button
                        block
                        type="button"
                        color="primary"
                        onClick={this.handleAuthedUser}
                      >
                        Login
                      </Button>
                    </div>
                  </div>
                </Form>
              </div>
            </Grid.Col>
          </div>
        </div>
      </Page>
    );
  }
}

function mapStateToProps({ setAuthedUser, users }) {
  return {
    users: Object.values(users),
    authedUser: setAuthedUser,
  };
}

export default withRouter(connect(mapStateToProps)(Login));
