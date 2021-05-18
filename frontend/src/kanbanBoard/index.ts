import kanbanBoardSlice from './state/kanbanBoardSlice';
import kanbanCardUISlice from './state/kanbanCardUISlice';
import { fetchBoardById, moveCard, moveColumn, updateCard } from './state/kanbanBoardThunks';

export const kanbanCardUIReducer = kanbanCardUISlice.reducer;
export const kanbanCardUIActions = kanbanCardUISlice.actions;

export const kanbanBoardReducer = kanbanBoardSlice.reducer;
export const kanbanBoardActions = {
  ...kanbanBoardSlice.actions,
  fetchBoardById,
  moveCard,
  moveColumn,
  updateCard
};
