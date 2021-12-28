import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";

const SiteWrapper = (props) => {
  const { users, authedUser } = props;

  const handleLogout = () => {
    props.dispatch(setAuthedUser(null));
    props.history.push("/");
  };

  return (
    <div className="ui segments">
      <div className="ui segment mb-5">
        <h4 className="left floated text">Hey {users[authedUser].name}</h4>
        <button
          onClick={handleLogout}
          className="button primary ui right floated "
        >
          Logout
        </button>
      </div>
      <div className="ui three item menu ">
        <div className="item ">
          <NavLink to="/">Home</NavLink>
        </div>
        <div className="item">
          <NavLink to={"/leaderboard"}>Leaderboard</NavLink>
        </div>
        <div className="item">
          <NavLink to={"/add"}>New Question</NavLink>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (store) => {
  return {
    authedUser: store.setAuthedUser,
    users: store.users,
  };
};
export default withRouter(connect(mapStateToProps)(SiteWrapper));
