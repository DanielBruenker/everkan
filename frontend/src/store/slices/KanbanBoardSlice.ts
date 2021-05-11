import { KanbanBoard } from "../../entities/KanbanBoard";
import { createSlice } from "@reduxjs/toolkit";
import { boardUtils } from "../../utils/KanbanBoardUtils";

const initialState = new KanbanBoard(0, []);

const kanbanBoardSlice = createSlice({
  name: "board",
  initialState: initialState,
  reducers: {
    setBoard(state, action) {
      state.id = action.payload.board.id;
      state.columns = action.payload.board.columns;
      state.changed = false;
    },
    moveCard(state, action) {
      const { source, destination, draggableId } = action.payload;
      state.columns = boardUtils.moveCard(
        state.columns,
        source,
        destination,
        draggableId
      );
      state.changed = true;
    },
    moveColumn(state, action) {
      const { source, destination, draggableId } = action.payload;
      state.columns = boardUtils.moveColumn(
        state.columns,
        source,
        destination,
        draggableId
      );
      state.changed = true;
    },
  },
});

export default kanbanBoardSlice;

export const boardActions = kanbanBoardSlice.actions;
