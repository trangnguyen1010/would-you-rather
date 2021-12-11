export const RECEIVE_USERS = "RECEIVE_USERS";
export const SAVE_ANSWER_TO_AUTHED_USER = "SAVE_ANSWER_TO_AUTHED_USER";
export const SAVE_QUESTION_TO_AUTHED_USER = "SAVE_QUESTION_TO_AUTHED_USER";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function saveQuestionToAuthedUser(authedUser, id) {
  return {
    type: SAVE_QUESTION_TO_AUTHED_USER,
    authedUser,
    id,
  };
}

export function saveAnswerToAutheduser(authedUser, id, answer) {
  return {
    type: SAVE_ANSWER_TO_AUTHED_USER,
    authedUser,
    id,
    answer,
  };
}
