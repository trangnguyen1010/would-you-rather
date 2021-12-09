import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect, withRouter } from "react-router-dom";
import { Text } from "tabler-react";
import SiteWrapper from "./SiteWrapper";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const RESULTS = "results";
const POLL = "poll";
const ANSWERED = "answered";
const UNANSWERED = "unanswered";

class HomePage extends Component {
  state = {
    questionList: UNANSWERED,
  };

  changeQuestionList = (e) => {
    if (!e.target.textContent.toLowerCase().includes(UNANSWERED)) {
      this.setState({ questionList: ANSWERED });
    } else {
      this.setState({ questionList: UNANSWERED });
    }
  };
  render() {
    const { questions, users, setAuthedUser, answered, unanswered } =
      this.props;
    console.log("home page: ", this.props);

    //redirect to Login page if not logged in
    if (!setAuthedUser) {
      return <Redirect to="/login" />;
    }

    return (
      <SiteWrapper>
        <Container>
          <Row>
            <Col lg={6}>
              <Button
                aria-selected={
                  this.state.questionList === UNANSWERED ? "true" : "false"
                }
                className="btn-primary btn-block mb-4"
                onClick={this.changeQuestionList}
              >
                Unanswered questions
              </Button>
            </Col>
            <Col lg={6}>
              <Button
                aria-selected={
                  this.state.questionList === ANSWERED ? "true" : "false"
                }
                onClick={this.changeQuestionList}
                className="btn-primary btn-block mb-4 btn"
              >
                Answered Questions
              </Button>
            </Col>
          </Row>
          <Row>
            {(this.state.questionList === UNANSWERED
              ? unanswered
              : answered
            ).map((answer) => (
              <Col key={questions[answer].id} lg={12} xs={12} sm={12} md={12}>
                <Card className="card card-profile">
                  <div className="card-profile text-center bg-dark">
                    <Text className="h3 text-white mx-auto mb-5 mt-5">
                      {users[questions[answer].author].name}
                    </Text>
                  </div>
                  <Card.Body className="card-body">
                    <img
                      src={users[questions[answer].author].avatarURL}
                      alt="avatar"
                      className="card-profile-img"
                    />
                    <h3 className="text-left mb-3">Would you rather</h3>
                    <p className="mb-4 h5 text-center">
                      ...{questions[answer].optionOne.text}...
                    </p>
                    <br />
                    <p className="mb-4 text-center">
                      <span className="bg-dark text-white text-center">OR</span>
                    </p>
                    <div className="ml-auto text-muted">
                      <Link
                        to={{
                          pathname: `/question/${questions[answer].id}`,
                          state: {
                            type:
                              this.state.questionList === UNANSWERED
                                ? POLL
                                : RESULTS,
                          },
                        }}
                      >
                        <Button color="primary" size="md">
                          ANSWER
                        </Button>
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </SiteWrapper>
    );
  }
}

function mapStateToProps({ setAuthedUser, users, questions }) {
  let answered, unanswered;
  const sort = (a, b) => {
    return (
      new Date(questions[b].timestamp).getTime() -
      new Date(questions[a].timestamp).getTime()
    );
  };
  if (setAuthedUser) {
    answered = Object.keys(users[setAuthedUser].answers).sort(sort);
    unanswered = Object.keys(Object.assign({}, questions)).sort(sort);
    answered.map(
      (answer) =>
        (unanswered = unanswered.filter((unanswered) => answer !== unanswered))
    );
  }
  return {
    setAuthedUser,
    users,
    questions,
    answered,
    unanswered,
  };
}

export default withRouter(connect(mapStateToProps)(HomePage));
