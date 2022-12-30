import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Features } from '../../../shared/consts/features.consts';
import { WatchablesState } from './watchables.reducers';

const getWatchablesState = createFeatureSelector<WatchablesState>(
  Features.Watchables
);

export const watchables = createSelector(
  getWatchablesState,
  (state: WatchablesState) => state.watchables
);

export const watchable = (id: string) =>
  createSelector(getWatchablesState, (state: WatchablesState) => {
    return state.watchables.find((it) => it._id === id);
  });
