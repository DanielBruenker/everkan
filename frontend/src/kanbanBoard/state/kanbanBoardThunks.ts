import { createAsyncThunk } from "@reduxjs/toolkit";
import { everkanApi } from "../../api";
import { RootState } from '../../store';
import { KanbanBoard, KanbanCard } from '../../types';
import { kanbanBoardActions } from '../index';
import { kanbanBoardUtils } from "../utils/KanbanBoardUtils";

export const fetchBoardById = createAsyncThunk(
  "kanbanBoard/getBoardById",
  async (boardId: number, thunkAPI) => {
    try {
      const response = await everkanApi.kanbanBoard.getBoardByID(1);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const moveCard = createAsyncThunk(
  "kanbanBoard/moveCard",
  async (
    args: {
      board: KanbanBoard;
      source: {
        droppableId: string;
        index: number;
      };
      destination: {
        droppableId: string;
        index: number;
      };
      draggableId: string;
    },
    {dispatch, rejectWithValue}
  ) => {
    const { board, source, destination, draggableId } = args;

    // The source column is the column from which an object is dragged.
    const sourceColumn = kanbanBoardUtils.findColumn(
      board.columns,
      source.droppableId
    );

    // The destination column is the column where an object will be dropped.
    const destinationColumn = kanbanBoardUtils.findColumn(
      board.columns,
      destination.droppableId
    );

    const card = kanbanBoardUtils.findCard(sourceColumn, draggableId);

    if (card == undefined) {
      return rejectWithValue("Card not found!");
    }

    // Move card in frontend and update board
    const updatedBoard = kanbanBoardUtils.moveCard(
      board,
      card,
      sourceColumn,
      destinationColumn,
      destination.index
    );
    dispatch({type: 'kanbanBoard/setBoard', payload: {board: updatedBoard}});

    // Move card in backend and update board
    try {
      const response = await everkanApi.kanbanBoard.moveCard(
        board.id,
        card.id,
        sourceColumn.id,
        destinationColumn.id,
        destination.index
      );
      return response.data;
    } catch (err) {
      return rejectWithValue({
        error: err.response.data,
        board: board,
      });
    }
  }
);

export const moveColumn = createAsyncThunk(
  "kanbanBoard/moveColumn",
  async (
    args: {
      board: KanbanBoard;
      source: {
        droppableId: string;
        index: number;
      };
      destination: {
        droppableId: string;
        index: number;
      };
      draggableId: string;
    },
    { dispatch, rejectWithValue }
  ) => {
    const { board, destination } = args;

    const column = kanbanBoardUtils.findColumn(board.columns, args.draggableId);

    const updatedBoard = kanbanBoardUtils.moveColumn(
      board,
      column,
      destination.index,
    );
    dispatch({type: 'kanbanBoard/setBoard', payload: {board: updatedBoard}});

    try {
      const response = await everkanApi.kanbanBoard.moveColumn(
        board.id,
        column.id,
        destination.index
      );
      return response.data;
    } catch (err) {
      return rejectWithValue({
        error: err.response.data,
        board: board,
      });
    }
  }
);

export const updateCard = createAsyncThunk(
  "kanbanCard/update",
  async (
    args: {board: KanbanBoard, card: KanbanCard},
    {rejectWithValue, getState }) => {
    try {
      const response = await everkanApi.kanbanBoard.updateCard(args.board, args.card);
      return response.data;
    } catch(err){
      return rejectWithValue(err.response.data);
    }
  }
);
