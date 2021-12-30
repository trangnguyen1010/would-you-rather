import { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { handleAddQuestion } from "../actions/shared";

const PollQuestionNew = ({ users, authedUser, dispatch }) => {
  const [optionOneText, setOptionOneText] = useState("");
  const [optionTwoText, setOptionTwoText] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = () => {
    dispatch(handleAddQuestion(optionOneText, optionTwoText));
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to={"/"} />;
  }

  return (
    <div className="ui segment ">
      <div className="ui card two fluid ">
        <div className="eight wide column card ">
          <div className=" ui grey inverted segment text-white center aligned ">
            <div className="ui content centered aligned ">
              <div className="ui header text text-white">
                {users[authedUser].name}
              </div>
              <div className=" circular image ui">
                <img alt="" src={users[authedUser].avatarURL} />
              </div>
            </div>
          </div>
          <div className="ui content mb-4 ">
            <h2>Would you rather ...</h2>
          </div>

          <div className="ui fluid input">
            <input
              type="text"
              placeholder="Enter option one..."
              value={optionOneText}
              onChange={(e) => setOptionOneText(e.target.value)}
            />
          </div>
          <h4 className="center aligned m-2">OR</h4>
          <div className="ui fluid input mb-4">
            <input
              type="text"
              placeholder="Enter option two..."
              value={optionTwoText}
              onChange={(e) => setOptionTwoText(e.target.value)}
            />
          </div>
          <button
            className="button primary fluid ui"
            type="submit"
            disabled={optionOneText === "" || optionTwoText === ""}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (store) => {
  console.log("QUestion new", store);
  return {
    users: store.users,
    authedUser: store.setAuthedUser,
    questions: store.questions,
  };
};
export default connect(mapStateToProps)(PollQuestionNew);
