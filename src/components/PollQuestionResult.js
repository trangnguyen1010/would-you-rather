import { connect } from "react-redux";

import { ProgressBar } from "react-bootstrap";
import { Link } from "react-router-dom";

const PollQuestionResult = ({ question, author, authedUser }) => {
  const { optionOne, optionTwo } = question;
  const totalVotes = optionOne.votes.length + optionTwo.votes.length;
  const percent1 = (optionOne.votes.length / totalVotes) * 100;
  const percent2 = (optionTwo.votes.length / totalVotes) * 100;
  return (
    <div>
      <div className="clearfix">
        <div className="right floated">
          {optionOne.votes.length} out of {totalVotes} votes
        </div>
      </div>
      <div>
        <ProgressBar now={percent1} label={`${percent1}%`} />
        <h5 className="muted">{optionOne.text}</h5>
      </div>
      <div className="clearfix">
        <div className="right floated">
          {optionTwo.votes.length} out of {totalVotes} votes
        </div>
        <div className=" mb-5">
          <ProgressBar variant="info" now={percent2} label={`${percent2}%`} />
          <h5 className="text-red">{optionTwo.text}</h5>
        </div>
      </div>

      <div className="ui content">
        <div className=" left floated grey ">{author.name} asked</div>
        <div className=" right floated">
          <Link to={"/"}>
            <button className="button ui primary">Return To Homepage</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default connect()(PollQuestionResult);
