import { AxiosResponse } from 'axios';
import { everkanApi } from "../apis/api";
import { KanbanBoard } from "../entities/KanbanBoard";
import { AppDispatch } from '../store';
import { boardActions } from "../store/slices/KanbanBoardSlice";

export const kanbanBoardService = {
  update,
  getBoardById,
};

function update(board: KanbanBoard): void {
  return async (dispatch: AppDispatch) => {
    await everkanApi.board.updateBoard(board)
      .then(response => {})
      .catch(error => {
        console.log(error);
      });
  };
}

function getBoardById(boardId = 1): void {
  return async (dispatch: AppDispatch) => {
    try {
      await everkanApi.board.getBoardByID(boardId)
        .then((response: AxiosResponse) => {
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
