import { configureStore } from '@reduxjs/toolkit';
import kanbanBoardSlice from './slices/KanbanBoardSlice';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import authenticationSlice from './slices/AuthenticationSlice';

const loggerMiddleware = createLogger();

export const store = configureStore({
  reducer: {
    board: kanbanBoardSlice.reducer,
    authentication: authenticationSlice.reducer
  },
  middleware: [
    thunkMiddleware,
    loggerMiddleware
  ]
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch