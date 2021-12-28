import { getInitialData, saveQuestion, saveQuestionAnswer } from "../utils/api";
import {
  receiveUsers,
  saveAnswerToAutheduser,
  saveQuestionToAuthedUser,
} from "./users";
import { addQuestion, receiveQuestions, saveAnswer } from "./questions";
import { showLoading } from "react-redux-loading";
import { setAuthedUser } from "./authedUser";

let AUTHED_ID = localStorage.getItem("loggedInUser");
if (AUTHED_ID === null) {
  AUTHED_ID = null;
}
export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(setAuthedUser(AUTHED_ID));
    });
  };
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { setAuthedUser } = getState();
    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: setAuthedUser,
    }).then((question) => {
      dispatch(addQuestion(question));
      dispatch(saveQuestionToAuthedUser(setAuthedUser, question.id));
    });
  };
}

export function handleSaveAnswer(id, answer) {
  return (dispatch, getState) => {
    const { setAuthedUser } = getState();
    return saveQuestionAnswer({ authedUser: setAuthedUser, qid: id, answer })
      .then(dispatch(saveAnswer(id, answer, setAuthedUser)))
      .then(dispatch(saveAnswerToAutheduser(setAuthedUser, id, answer)));
  };
}
