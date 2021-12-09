export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const SAVE_ANSWER = "SAVE_ANSWER";
export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

export function saveQuestionAnswer(id, answer, authedUser) {
  return {
    type: SAVE_ANSWER,
    id,
    answer,
    authedUser,
  };
}
