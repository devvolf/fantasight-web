import { createReducer, on } from '@ngrx/store';
import { isProcessing } from '../../../auth/state/auth.selectors';
import { Watchable } from '../../../shared/models/watchable/watchable.model';
import {
  addWatchable,
  addWatchableFailure,
  addWatchableSuccess,
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
    isProcessing: false,
    watchables,
  })),
  on(getAllWatchablesFailure, (state) => ({
    ...state,
    isProcessing: false,
  })),
  on(addWatchable, (state) => ({
    ...state,
    isProcessing: true,
  })),
  on(addWatchableSuccess, (state) => ({
    ...state,
    isProcessing: false,
  })),
  on(addWatchableFailure, (state) => ({
    ...state,
    isProcessing: false,
  }))
);
