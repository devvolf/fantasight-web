import { createReducer, on } from '@ngrx/store';
import { isProcessing } from '../../../auth/state/auth.selectors';
import { Watchable } from '../../../shared/models/watchable/watchable.model';
import {
  addFilm,
  addFilmFailure,
  addFilmSuccess,
  addSerie,
  addSerieFailure,
  addSerieSuccess,
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
  on(addFilm, (state) => ({
    ...state,
    isProcessing: true,
  })),
  on(addFilmSuccess, (state) => ({
    ...state,
    isProcessing: false,
  })),
  on(addFilmFailure, (state) => ({
    ...state,
    isProcessing: false,
  })),
  on(addSerie, (state) => ({
    ...state,
    isProcessing: true,
  })),
  on(addSerieSuccess, (state) => ({
    ...state,
    isProcessing: false,
  })),
  on(addSerieFailure, (state) => ({
    ...state,
    isProcessing: false,
  }))
);
