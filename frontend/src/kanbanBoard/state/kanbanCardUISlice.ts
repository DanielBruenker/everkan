import { createSlice } from '@reduxjs/toolkit';
import { KanbanCard } from '../../types';

const initialState = {
  showKanbanCardDialog: false,
  selectedCard: {id: 0, title: "", description: "", index: 0, columnId: 0}
};

const kanbanCardUISlice = createSlice({
  name: 'kanbanBoardUI',
  initialState: initialState,
  reducers: {
    showKanbanCardDialog(state, action){
      state.selectedCard = action.payload.card;
      state.showKanbanCardDialog = true;
    },
    hideKanbanCardDialog(state){
      state.showKanbanCardDialog = false;
    }
  }
});

export default kanbanCardUISlice;