import { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link, Redirect } from "react-router-dom";

const ANSWERED = "ANSWERED";
const UNANSWERED = "UNANSWERED";

const HomePage = ({
  authedUser,
  answeredQuestion,
  unAnsweredQuestion,
  questions,
  users,
}) => {
  const [questionList, setQuestionList] = useState(UNANSWERED);

  if (!authedUser) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="ui  centered segment ">
      <div className="ui two column grid centered  ">
        <div className="six wide column">
          <div className="ui">
            <button
              className="ui primary button fluid"
              onClick={() => setQuestionList(UNANSWERED)}
            >
              Unanswered Questions
            </button>
          </div>
        </div>

        <div className="six wide column">
          <div className="ui">
            <button
              className="ui green button fluid"
              onClick={() => setQuestionList(ANSWERED)}
            >
              Answered Questions
            </button>
          </div>
        </div>
      </div>
      {(questionList === UNANSWERED
        ? unAnsweredQuestion
        : answeredQuestion
      ).map((questionId) => (
        <div key={questionId} className="ui card  fluid">
          <div className="ui content center aligned ui grey inverted segment text-white">
            <div className="ui center aligned header">
              {users[questions[questionId].author].name}
            </div>
            <div className=" circular image ui centered aligned">
              <img
                className="ui centered circular image"
                alt=""
                src={users[questions[questionId].author].avatarURL}
              />
            </div>
          </div>
          <div className="content">
            <h2 className="text">Would you rather...</h2>
            <h5 className="text center aligned">
              ...{questions[questionId].optionOne.text}
            </h5>
            <p className="center aligned">
              <span className="bg-dark text-white mt-5 p-2">OR</span>
            </p>
            <div className="content">
              <div className="left meta">
                {users[questions[questionId].author].name} asked
              </div>
              <div className="right floated">
                <Link
                  to={{
                    pathname: `/question/${questionId}`,
                    state: {
                      type: UNANSWERED ? "poll" : "result",
                    },
                  }}
                >
                  <button className="button ui primary">Answer</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  let answeredQuestion, unAnsweredQuestion;
  const authedUser = state.setAuthedUser;
  const questions = state.questions;
  const users = state.users;

  const sort = (a, b) => {
    return (
      new Date(questions[b].timestamp).getTime() -
      new Date(questions[a].timestamp).getTime()
    );
  };
  if (authedUser) {
    answeredQuestion = Object.keys(users[authedUser].answers).sort(sort);
    unAnsweredQuestion = Object.keys(questions).sort(sort);
    answeredQuestion.map(
      (answerId) =>
        (unAnsweredQuestion = unAnsweredQuestion.filter(
          (unanswerId) => answerId !== unanswerId
        ))
    );
  }

  return {
    authedUser,
    answeredQuestion,
    unAnsweredQuestion,
    questions,
    users,
  };
};
export default withRouter(connect(mapStateToProps)(HomePage));
