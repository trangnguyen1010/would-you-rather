import { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { handleSaveAnswer } from "../actions/shared";

const PollQuestionAnswer = (props) => {
  const [option, setOption] = useState("none");
  const [error, setError] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    option === "none"
      ? setError(true)
      : props.dispatch(handleSaveAnswer(props.question.id, option));
    return <Redirect to={"/"} />;
  };

  return (
    <div className="ui form">
      <div className="ui center aligned">
        <p className="header muted">Choose one option</p>
      </div>
      {error && <div className="muted">Please select one option</div>}
      <div className="inline fields">
        <div className="field">
          <div className="ui radio">
            <input
              type="radio"
              name="choice"
              value="optionOne"
              className="hidden"
              onChange={(e) => setOption(e.target.value)}
            />
            <label>{props.question.optionOne.text}</label>
          </div>
        </div>
        <div className="field">
          <div className="ui radio">
            <input
              type="radio"
              name="choice"
              value="optionTwo"
              className="hidden"
              onChange={(e) => setOption(e.target.value)}
            />
            <label>{props.question.optionTwo.text}</label>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="ui button primary fluid"
        onClick={handleSubmit}
      >
        Answer
      </button>
    </div>
  );
};

export default connect()(PollQuestionAnswer);
