import { everkanApi } from "../apis/api";
import { KanbanBoard } from "../entities/KanbanBoard";
import { boardActions } from "../store/slices/KanbanBoardSlice";

export const kanbanBoardService = {
  update,
  getBoardById,
};

function update(board: KanbanBoard) {
  return async (dispatch) => {
    await everkanApi.board.updateBoard(board)
      .then(response => {})
      .catch(error => {
        console.log(error);
      });
  };
}

function getBoardById(boardId = 1) {
  return async (dispatch) => {
    try {
      await everkanApi.board.getBoardByID(boardId)
        .then(response => {
          dispatch(boardActions.setBoard({ board: response.data }));
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.error(error);
    }
  };
}
