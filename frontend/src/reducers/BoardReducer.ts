import { boardConstants } from '../constants';
import { KanbanBoard } from '../entities/KanbanBoard';

const initState = new KanbanBoard(0, []);

export function board(state = initState, action) {
  switch (action.type) {
    case boardConstants.CARD_MOVED:
      return {
       ...action.board
      };
    case boardConstants.BOARD_UPDATED:
      return state;

    case boardConstants.COLUMN_MOVED:
      return {
        ...action.board
      };
    case boardConstants.UPDATE_BOARD_FAILED:
      return {
        ...action.board,
        error: action.error
      };
    case boardConstants.FETCH_BOARD_COMPLETED:
      return {
        ...state,
        id: action.board.id,
        columns: action.board.columns
      };
    default:
      return state
  }
}