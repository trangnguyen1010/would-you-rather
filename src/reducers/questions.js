import {
  ADD_QUESTION,
  RECEIVE_QUESTIONS,
  SAVE_ANSWER,
} from "../actions/questions";

export default function questions(state = {}, action) {
  const { id, answer, authedUser, question } = action;
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };

    case ADD_QUESTION:
      return {
        ...state,
        [question.id]: question,
      };

    case SAVE_ANSWER:
      return {
        ...state,
        [id]: {
          ...state[id],
          [answer]: {
            ...state[id][answer],
            votes: state[id][answer].votes.concat(authedUser),
          },
        },
      };
    default:
      return state;
  }
}
