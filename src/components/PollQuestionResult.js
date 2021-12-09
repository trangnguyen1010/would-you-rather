import React, { Component } from "react";
import { ProgressBar, Progress } from "react-bootstrap";
import { connect } from "react-redux";
import { Text } from "tabler-react";
import "bootstrap/dist/css/bootstrap.min.css";

class PollQuestionResult extends Component {
  render() {
    const { question, authedUser } = this.props;
    const { optionOne, optionTwo } = question;
    const totalVotes = optionOne.votes.length + optionTwo.votes.length;
    const selected = optionOne.votes.includes(authedUser);
    const percent1 = (optionOne.votes.length / totalVotes) * 100;
    const percent2 = (optionTwo.votes.length / totalVotes) * 100;
    console.log("total vote", totalVotes);
    console.log("result pages", this.props);
    return (
      <div className="text-left">
        <div className={`question-result mb-4 ${selected}`}>
          <div className="clearfix">
            <div className="float-right">
              <Text.Small muted>
                {optionOne.votes.length} out of {totalVotes} votes
              </Text.Small>
            </div>
          </div>
          <ProgressBar
            label={`${percent1}%`}
            now={percent1.toFixed(0)}
            variant="info"
          />
          <h4>{optionOne.text}</h4>
        </div>
        <div className={`question-result mb-4 ${!selected}`}>
          <div className="clearfix">
            <div className="float-right">
              <Text.Small muted>
                {optionTwo.votes.length} out of {totalVotes} votes
              </Text.Small>
            </div>
          </div>
          <ProgressBar
            now={percent2.toFixed(0)}
            label={`${percent2}%`}
            variant="info"
          />
          <h4>{optionTwo.text}</h4>
        </div>
      </div>
    );
  }
}

export default connect()(PollQuestionResult);
