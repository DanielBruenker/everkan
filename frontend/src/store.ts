import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { alertReducer } from './alert';
import { authenticationReducer } from './authentication';
import { kanbanBoardReducer } from './kanbanBoard';
import { kanbanBoardUIReducer } from './kanbanBoard';

const loggerMiddleware = createLogger();

export const store = configureStore({
  reducer: {
    kanbanBoard: kanbanBoardReducer,
    kanbanBoardUI: kanbanBoardUIReducer,
    authentication: authenticationReducer,
    alert: alertReducer
  },
  middleware: [
    thunkMiddleware,
    loggerMiddleware
  ]
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store