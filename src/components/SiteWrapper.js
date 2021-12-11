import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import { Grid, Nav, Site } from "tabler-react";
import logo from "../assets/logo.svg";
import { setAuthedUser } from "../actions/authedUser";
import "bootstrap/dist/css/bootstrap.min.css";

class SiteWrapper extends Component {
  logOut = () => {
    this.props.dispatch(setAuthedUser(null));
    this.props.history.push("/");
  };

  login = () => {
    this.props.history.push("/login");
  };
  render() {
    const { authedUser, users } = this.props;

    const navBarItems = authedUser
      ? [
          {
            value: "Home",
            to: "/",
            icon: "home",
            LinkComponent: NavLink,
            useExact: true,
          },
          {
            value: "Leaderboard",
            to: "/leaderboard",
            icon: "award",
            LinkComponent: NavLink,
            useExact: true,
          },
          {
            value: "Add Question",
            to: "/add",
            icon: "plus-circle",
            LinkComponent: NavLink,
            useExact: true,
          },
        ]
      : [];

    const accountDropdownOptions = authedUser
      ? {
          name: users[authedUser].name,
          options: [
            {
              value: "Sign Out",
              onClick: () => this.logOut(),
            },
          ],
        }
      : false;

    let loginLink;

    if (!authedUser) {
      loginLink = <NavLink to="login">SIGN IN</NavLink>;
    } else {
      loginLink = false;
    }
    return (
      <Site.Wrapper
        headerProps={{
          alt: "Would you rather",
          imageURL: logo,
          navItems: (
            <Nav.Item type="div" className="d-none d-md-flex">
              {loginLink}
            </Nav.Item>
          ),
          accountDropdown: accountDropdownOptions,
        }}
        navProps={{ itemsObjects: navBarItems }}
      >
        <div className="my-3 my-md-5">
          <div className="container">
            <Grid.Row>
              <Grid.Col sm={12} md={10} offsetMd={1} offsetLg={2}>
                {this.props.children}
              </Grid.Col>
            </Grid.Row>
          </div>
        </div>
      </Site.Wrapper>
    );
  }
}

function mapStateToProps({ setAuthedUser, users }) {
  return {
    authedUser: setAuthedUser,
    users: users,
  };
}

export default withRouter(connect(mapStateToProps)(SiteWrapper));
