import React, { Component } from "react";
import { Badge, Card, Table } from "react-bootstrap";
import { connect } from "react-redux";
import SiteWrapper from "./SiteWrapper";
import { Text } from "tabler-react";

class Leaderboard extends Component {
  render() {
    const { questions, users } = this.props;
    console.log("leaderboard: ", this.props);
    return (
      <SiteWrapper>
        <Card className="card card-profile">
          <Card.Header>
            <Card.Title>Leaderboard</Card.Title>
          </Card.Header>
          <Table className="table-vcenter" striped bordered>
            <thead className="text-center">
              <tr>
                <th>SCORE</th>
                <th>USER</th>
                <th>ANSWERED QUESTIONS</th>
                <th>CREATED QUESTIONS</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(users).map((user, index) => (
                <tr key={user.id}>
                  <th>
                    <Badge color="warning">
                      <Text className="my-0 mx-1">
                        {Object.keys(user.answers).length +
                          user.questions.length}
                      </Text>
                    </Badge>
                  </th>
                  <th>{user.name}</th>
                  <th className="text-center">
                    {Object.keys(user.answers).length}
                  </th>
                  <th className="text-center">{user.questions.length}</th>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </SiteWrapper>
    );
  }
}

function mapStateToProps({ questions, users }) {
  return {
    questions,
    users,
  };
}

export default connect(mapStateToProps)(Leaderboard);
