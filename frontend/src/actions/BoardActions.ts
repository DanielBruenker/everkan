import { boardConstants } from '../constants';
import { boardHelper } from '../helpers';
import { boardService } from '../services';

export const boardActions = {
  moveCard,
  moveColumn,
  fetchBoard
};

function moveCard(board, source, destination, draggableId) {

  return (dispatch: any) => {
    const columns = boardHelper.moveCard(board.columns, source, destination, draggableId)
    const newBoard = { ...board, columns: columns };
    dispatch({type: boardConstants.COLUMN_MOVED, board: newBoard});
    boardService.update(newBoard)
      .then(
        board => {
          dispatch({type: boardConstants.BOARD_UPDATED,  board: newBoard})
        },
        error => {
          dispatch({type: boardConstants.UPDATE_BOARD_FAILED,  board: board, error});
        }
      );
  };
}

function moveColumn(board, source, destination, draggableId) {

  return (dispatch: any) => {
    const columns = boardHelper.moveColumn(board.columns, source, destination, draggableId)
    const newBoard = { ...board, columns: columns };
    dispatch({ type: boardConstants.COLUMN_MOVED, board: newBoard});
    boardService.update(newBoard)
      .then(
        board => {
          dispatch({type: boardConstants.BOARD_UPDATED,  board: newBoard})
        },
        error => {
          dispatch({type: boardConstants.UPDATE_BOARD_FAILED,  board: board, error});
        }
      );
  };
}

function fetchBoard(){
  return (dispatch: any) => {
    boardService.getBoard()
      .then(
        board => {
          dispatch({type: boardConstants.FETCH_BOARD_COMPLETED, board });
        },
        error => {}
      );
  };
}