import { getInitialData, saveQuestionAnswer } from "../utils/api";
import { receiveUsers, saveAnswerToAutheduser } from "./users";
import { receiveQuestions } from "./questions";
import { showLoading } from "react-redux-loading";
import { setAuthedUser } from "./authedUser";

// const AUTHED_ID = "sarahedo";
export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      // dispatch(setAuthedUser(AUTHED_ID));
    });
  };
}

export function handleSaveAnswer(id, answer) {
  return (dispatch, getState) => {
    const { setAuthedUser } = getState();
    return saveQuestionAnswer({ setAuthedUser, id, answer })
      .then(dispatch(saveQuestionAnswer(id, answer, setAuthedUser)))
      .then(dispatch(saveAnswerToAutheduser(setAuthedUser, id, answer)));
  };
}
