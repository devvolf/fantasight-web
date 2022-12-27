import { createReducer, on } from '@ngrx/store';
import { isProcessing } from '../../../auth/state/auth.selectors';
import { Genre } from '../../../shared/models/genre.model';
import {
  addGenre,
  addGenreFailure,
  addGenreSuccess,
  getAllGenres,
  getAllGenresFailure,
  getAllGenresSuccess,
} from './genres.actions';

export interface GenresState {
  genres: Genre[];
  isProcessing: boolean;
}

export const initialState = {
  genres: [],
  isProcessing: false,
};

export const genresReducer = createReducer<GenresState>(
  initialState,
  on(getAllGenres, (state) => ({
    ...state,
    isProcessing: true,
  })),
  on(getAllGenresSuccess, (state, { genres }) => ({
    ...state,
    isProcessing: false,
    genres,
  })),
  on(getAllGenresFailure, (state) => ({
    ...state,
    isProcessing: false,
  })),
  on(addGenre, (state) => ({
    ...state,
    isProcessing: true,
  })),
  on(addGenreSuccess, (state) => ({
    ...state,
    isProcessing: false,
  })),
  on(addGenreFailure, (state) => ({
    ...state,
    isProcessing: false,
  }))
);
