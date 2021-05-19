import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showKanbanCardDialog: false,
  showAddNewKanbanCardDialog: false,
  selectedColumn: {id: 0, title: "", cards: [], index: 0 },
  selectedCard: {id: 0, title: "", description: "", noteLink: "", index: 0, columnId: 0}
};

const kanbanBoardUISlice = createSlice({
  name: 'kanbanBoardUI',
  initialState: initialState,
  reducers: {
    showKanbanCardDialog(state, action){
      state.selectedCard = action.payload.card;
      state.showKanbanCardDialog = true;
    },
    hideKanbanCardDialog(state){
      state.showKanbanCardDialog = false;
    },
    showAddNewKanbanCardDialog(state, action){
      state.selectedColumn = action.payload.column;
      state.showAddNewKanbanCardDialog = true;
    },
    hideAddNewKanbanCardDialog(state){
      state.showAddNewKanbanCardDialog = false;
    }
  }
});

export default kanbanBoardUISlice;