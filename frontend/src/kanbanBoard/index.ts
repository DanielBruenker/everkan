import kanbanBoardSlice from './state/kanbanBoardSlice';
import kanbanBoardUISlice from './state/kanbanBoardUISlice';
import { addCard, fetchBoardById, moveCard, moveColumn, updateCard } from './state/kanbanBoardThunks';

export const kanbanBoardUIReducer = kanbanBoardUISlice.reducer;
export const kanbanBoardUIActions = kanbanBoardUISlice.actions;

export const kanbanBoardReducer = kanbanBoardSlice.reducer;
export const kanbanBoardActions = {
  ...kanbanBoardSlice.actions,
  fetchBoardById,
  moveCard,
  moveColumn,
  updateCard,
  addCard
};
