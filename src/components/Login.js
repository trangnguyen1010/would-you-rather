import React, { useEffect, useRef, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";

const Login = (props) => {
  const [authedUserLogin, setAuthedUserLogin] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const onBodyClick = (e) => {
      if (ref.current.contains(e.target)) {
        return;
      }
      setOpen(false);
    };

    document.body.addEventListener("click", onBodyClick, { capture: true });

    return () => {
      document.body.removeEventListener("click", onBodyClick, {
        capture: true,
      });
    };
  }, []);

  const handleAuthedUser = () => {
    props.dispatch(setAuthedUser(authedUserLogin));
    let prevRoutePath =
      props.location.state !== undefined
        ? props.location.state.previous.pathname
        : null;

    prevRoutePath ? props.history.push(prevRoutePath) : props.history.push("/");
    props.location.state
      ? props.history.push(props.location.state.previous.pathname)
      : props.history.push("/");
  };

  const { users } = props;
  return (
    <div className="ui form segment" ref={ref}>
      <div className="field">
        <h1 className="header">Login To Your Account</h1>
        <label>Select User</label>
        <div
          className={`ui selection dropdown ${open ? "visible active" : ""}`}
          onClick={() => setOpen(!open)}
        >
          <i className="icon dropdown"></i>
          <div className="text">
            {authedUserLogin !== "" && users[authedUserLogin].name}
          </div>
          <div className={`menu ${open ? "visible transition" : ""}`}>
            {Object.values(users).map((user) => (
              <div
                className="item"
                key={user.name}
                onClick={() => setAuthedUserLogin(user.id)}
              >
                {user.name}
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="ui button blue"
          onClick={handleAuthedUser}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

function mapStateToProps(store) {
  return {
    users: store.users,
    authedUser: store.setAuthedUser,
  };
}

export default withRouter(connect(mapStateToProps)(Login));
