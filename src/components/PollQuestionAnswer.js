import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, FormGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "@restart/ui/esm/Button";
import { handleSaveAnswer } from "../actions/shared";

class PollQuestionAnswer extends Component {
  state = {
    option: "none",
    error: false,
  };

  handleChange = (e) => {
    this.setState({
      option: e.target.value,
      error: false,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { option } = this.state;
    const { dispatch, question } = this.props;

    this.state.option === "none"
      ? this.setState({ error: true })
      : dispatch(handleSaveAnswer(question.id, option));
  };
  render() {
    const { question } = this.props;
    return (
      <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label className="text-muted">Choose one option</Form.Label>
          {this.state.error && (
            <small className="text-danger p-4">please select one option</small>
          )}

          <Form.Switch
            label={question.optionOne.text}
            name="choice"
            type="radio"
            value="optionOne"
            className="pf-auto"
          />
          <Form.Switch
            label={question.optionTwo.text}
            name="choice"
            type="radio"
            value="optionTwo"
          />
        </Form.Group>
        <Button
          className="btn-primary btn-block btn"
          type="submit"
          value="submit answer"
        >
          Submit Answer
        </Button>
      </form>
    );
  }
}

export default connect()(PollQuestionAnswer);
