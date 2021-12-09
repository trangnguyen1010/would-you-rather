import React, { Component } from "react";
import { connect } from "react-redux";
import SiteWrapper from "./SiteWrapper";
import { Page, Text } from "tabler-react";
import { Card } from "react-bootstrap";
import PollQuestionAnswer from "./PollQuestionAnswer";
import PollQuestionResult from "./PollQuestionResult";
import { Link } from "react-router-dom";
import Button from "@restart/ui/esm/Button";

class PollQuestion extends Component {
  render() {
    const { setAuthedUser, users, question } = this.props;
    console.log("Poll question: ", this.props);

    const questionAnswered = Object.keys(users[setAuthedUser].answers).includes(
      question.id
    );

    console.log("answer: ", questionAnswered);
    return (
      <SiteWrapper>
        <Page.Content>
          <Card className="card card-profile">
            <div className="card-header bg-dark text-center">
              <Text className="h3 text-white mx-auto mb-5">
                {users[question.author].name}
              </Text>
            </div>
            <Card.Body className="card-body text-center">
              <img
                src={users[question.author].avatarURL}
                className="card-profile-img"
                alt=""
              />
              <h3 className="mb-3 text-left">Would you rather ...</h3>
              {questionAnswered ? (
                <PollQuestionResult
                  question={question}
                  author={users[question.author]}
                  authedUser={setAuthedUser}
                />
              ) : (
                <PollQuestionAnswer
                  question={question}
                  author={users[question.author]}
                />
              )}
              {questionAnswered && (
                <div className="ml-auto text-muted">
                  <Link to={"/"}>
                    <Button color="primary" size="md" outline>
                      Return to HomePage
                    </Button>
                  </Link>
                </div>
              )}
            </Card.Body>
          </Card>
        </Page.Content>
      </SiteWrapper>
    );
  }
}

function mapStateToProps({ setAuthedUser, users, questions }, props) {
  return {
    setAuthedUser,
    users,
    question: questions[props.match.params.id],
  };
}

export default connect(mapStateToProps)(PollQuestion);
