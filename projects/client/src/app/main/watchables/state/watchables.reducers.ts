import { createReducer, on } from '@ngrx/store';
import { Watchable } from '../../../shared/models/watchable.model';
import {
  getAllWatchables,
  getAllWatchablesFailure,
  getAllWatchablesSuccess,
} from './watchables.actions';

export interface WatchablesState {
  watchables: Watchable[];
  isProcessing: boolean;
}

export const initialState = {
  watchables: [],
  isProcessing: false,
};

export const watchablesReducer = createReducer<WatchablesState>(
  initialState,
  on(getAllWatchables, (state) => ({
    ...state,
    isProcessing: true,
  })),
  on(getAllWatchablesSuccess, (state, { watchables }) => ({
    ...state,
    watchables,
    isProcessing: false,
  })),
  on(getAllWatchablesFailure, (state) => ({
    ...state,
    isProcessing: false,
  }))
);
