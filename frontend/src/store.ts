import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import { authenticationReducer } from './authentication/state/authenticationReducer';
import { kanbanBoardReducer } from './kanbanBoard';
import { kanbanCardUIReducer } from './kanbanBoard';

const loggerMiddleware = createLogger();

export const store = configureStore({
  reducer: {
    kanbanBoard: kanbanBoardReducer,
    kanbanCardUI: kanbanCardUIReducer,
    authentication: authenticationReducer
  },
  middleware: [
    thunkMiddleware,
    loggerMiddleware
  ]
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store