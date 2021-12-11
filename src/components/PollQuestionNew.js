import React, { Component } from "react";
import { connect } from "react-redux";
import SiteWrapper from "./SiteWrapper";
import { Page, Text } from "tabler-react";
import { Button, Card, Form } from "react-bootstrap";
import { handleAddQuestion } from "../actions/shared";
import { Redirect } from "react-router-dom";

class PollQuestionNew extends Component {
  state = {
    optionOneText: "",
    optionTwoText: "",
    redirect: false,
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { optionOneText, optionTwoText } = this.state;

    this.props.dispatch(handleAddQuestion(optionOneText, optionTwoText));
    this.setState({ redirect: true });
  };

  render() {
    const { authedUser, users } = this.props;
    console.log("New question: ", this.props);

    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <SiteWrapper>
        <Page.Content>
          <Card className="card card-profile">
            <div className="card-header bg-dark text-center">
              <Text className="h3 text-white mx-auto mb-5">
                {users[authedUser].name}
              </Text>
            </div>
            <Card.Body className="card-body text-center">
              <img
                alt="="
                src={users[authedUser].avatarURL}
                className="card-profile-img"
              />

              <h3 className="mb-3 text-left text-muted">Would you rather...</h3>

              <form onSubmit={this.handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Option one..."
                    onChange={(e) =>
                      this.setState({ optionOneText: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="bg-light mb-3">
                  <Form.Text className="text-dark">OR</Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Option Two..."
                    onChange={(e) =>
                      this.setState({ optionTwoText: e.target.value })
                    }
                  />
                </Form.Group>
                <Button
                  type="submit"
                  disabled={
                    this.state.optionOneText === "" ||
                    this.state.optionTwoText === ""
                  }
                >
                  Ask Question
                </Button>
              </form>
            </Card.Body>
          </Card>
        </Page.Content>
      </SiteWrapper>
    );
  }
}
function mapStateToProps({ users, questions, setAuthedUser }) {
  return {
    authedUser: setAuthedUser,
    questions,
    users,
  };
}

export default connect(mapStateToProps)(PollQuestionNew);
