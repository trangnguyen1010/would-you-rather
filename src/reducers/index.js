import { combineReducers } from "redux";
import users from "./users";
import questions from "./questions";
import setAuthedUser from "./authedUser";

export default combineReducers({
  setAuthedUser,
  users,
  questions,
});
