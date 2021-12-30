import React from "react";
import { Badge } from "react-bootstrap";
import { connect } from "react-redux";
import { Text } from "tabler-react";

const Leaderboard = (store) => {
  const { users } = store;
  return (
    <table className="ui center aligned celled table">
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
                  {Object.keys(user.answers).length + user.questions.length}
                </Text>
              </Badge>
            </th>
            <th>{user.name}</th>
            <th className="text-center">{Object.keys(user.answers).length}</th>
            <th className="text-center">{user.questions.length}</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

function mapStateToProps(store) {
  return {
    questions: store.questions,
    users: store.users,
  };
}

export default connect(mapStateToProps)(Leaderboard);
