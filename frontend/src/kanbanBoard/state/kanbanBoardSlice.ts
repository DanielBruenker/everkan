import { createSlice } from "@reduxjs/toolkit";
import { KanbanColumn } from "../../types";
import { addCard, fetchBoardById, moveCard, moveColumn, updateCard } from './kanbanBoardThunks';

const initialState = {
  id: 0,
  columns: new Array<KanbanColumn>(),
};

const kanbanBoardSlice = createSlice({
  name: "kanbanBoard",
  initialState: initialState,
  reducers: {
    setBoard(state, action) {
      state.id = action.payload.board.id;
      state.columns = action.payload.board.columns;
    },
  },
  extraReducers: {
    [moveCard.fulfilled.type]: (state, action) => {
      state.id = action.payload.id;
      state.columns = action.payload.columns;
    },
    [moveColumn.fulfilled.type]: (state, action) => {
      state.id = action.payload.id;
      state.columns = action.payload.columns;
    },
    [fetchBoardById.fulfilled.type]: (state, action) => {
      state.id = action.payload.id;
      state.columns = action.payload.columns;
    },
    [updateCard.fulfilled.type]: (state, action) => {
      state.id = action.payload.id;
      state.columns = action.payload.columns;
    },
    [addCard.fulfilled.type]: (state, action) => {
      state.id = action.payload.id;
      state.columns = action.payload.columns;
    }
  },
});

export default kanbanBoardSlice;
