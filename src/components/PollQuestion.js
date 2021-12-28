import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PollQuestionResult from "./PollQuestionResult";
import PollQuestionAnswer from "./PollQuestionAnswer";
import SiteWrapper from "./SiteWrapper";

const PollQuestion = ({ users, authedUser, question, questions }) => {
  const answerQuestion = Object.keys(users[authedUser].answers).includes(
    question.id
  );
  if (!authedUser) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="ui segment ">
      <div className="ui card two fluid ">
        <div className="eight wide column card ">
          <div className=" ui grey inverted segment text-white center aligned ">
            <div className="ui content centered aligned ">
              <div className="ui header text text-white">
                {users[questions[question.id].author].name}
              </div>
              <div className=" circular image ui">
                <img
                  alt=""
                  src={users[questions[question.id].author].avatarURL}
                />
              </div>
            </div>
          </div>
          <div className="ui content ">
            <h2>Would you rather ...</h2>
          </div>
          <div>
            {answerQuestion ? (
              <PollQuestionResult
                question={questions[question.id]}
                author={users[questions[question.id].author]}
                authedUser={authedUser}
              />
            ) : (
              <PollQuestionAnswer
                question={questions[question.id]}
                author={users[questions[question.id].author]}
                authedUser={authedUser}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ setAuthedUser, questions, users }, props) => {
  return {
    questions,
    users,
    authedUser: setAuthedUser,
    question: questions[props.match.params.id],
  };
};
export default connect(mapStateToProps)(PollQuestion);
