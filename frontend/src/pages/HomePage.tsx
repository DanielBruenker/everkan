import { Button } from "@material-ui/core";
import { useEffect } from "react";
import { connect } from "react-redux";
import { userActions } from "../actions";
import { boardActions } from "../actions/BoardActions";
import { KanbanBoard } from "../components/KanbanBoard";

const HomePage = (props: any) => {
  useEffect(() => {
    if (props.board.id == null) {
      props.fetchBoard();
    }
  }, [props]);

  const renderBoard = () => {
    if (props.board) {
      return <KanbanBoard />;
    } else {
      return null;
    }
  };

  return (
    <div>
      {renderBoard()}
      <Button onClick={props.logout}>Logout</Button>
    </div>
  );
};

function mapState(state) {
  const { loggingIn, user, board } = state;
  return { loggingIn, user, board };
}

const actionCreators = {
  login: userActions.login,
  logout: userActions.logout,
  fetchBoard: boardActions.fetchBoard,
};

const connectHomePage = connect(mapState, actionCreators)(HomePage);
export { connectHomePage as HomePage };
