export const RECEIVE_USERS = "RECEIVE_USERS";
export const SAVE_ANSWER_TO_AUTHED_USER = "SAVE_ANSWER_TO_AUTHED_USER";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
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
