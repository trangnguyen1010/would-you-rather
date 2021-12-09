import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

class User extends Component {
  render() {
    const { user, handleLogin } = this.props;
    const { name, avatarURL } = user;
    return (
      <div className="card">
        <img
          src={avatarURL}
          className="card-img-top"
          alt={`Avatar of ${name}`}
        />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          {handleLogin && (
            <Fragment>
              <hr />
              <button className="btn btn-primary" onClick={this.handleClick}>
                Login
              </button>
            </Fragment>
          )}
        </div>
      </div>
    );
  }

  handleClick = (e) => {
    const { id, handleLogin } = this.props;
    handleLogin(id);
  };
}

function mapStateToProps({ users }, { id }) {
  const user = users[id];
  return {
    user,
  };
}

export default connect(mapStateToProps)(User);
