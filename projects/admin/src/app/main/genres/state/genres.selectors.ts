import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Features } from '../../../shared/consts/features.consts';
import { GenresState } from './genres.reducers';

const getGenresState = createFeatureSelector<GenresState>(Features.Genres);

export const genres = createSelector(
  getGenresState,
  (state: GenresState) => state.genres
);

export const genre = (id: string) =>
  createSelector(getGenresState, (state: GenresState) => {
    return state.genres.find((it) => it._id === id);
  });
