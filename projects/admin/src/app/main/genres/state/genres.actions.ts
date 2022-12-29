import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Features } from '../../../shared/consts/features.consts';
import { AddGenre } from '../../../shared/models/genre/add-genre.model';
import { EditGenre } from '../../../shared/models/genre/edit-genre.model';
import { Genre } from '../../../shared/models/genre/genre.model';

export const GenresActions = {
  GetAllGenres: `[${Features.Genres}] Get All Genres`,
  GetAllGenresSuccess: `[${Features.Genres}] Get All Genres Success`,
  GetAllGenresFailure: `[${Features.Genres}] Get All Genres Failure`,
  AddGenre: `[${Features.Genres}] Add Genre`,
  AddGenreSuccess: `[${Features.Genres}] Add Genre Success`,
  AddGenreFailure: `[${Features.Genres}] Add Genre Failure`,
  EditGenre: `[${Features.Genres}] Edit Genre`,
  EditGenreSuccess: `[${Features.Genres}] Edit Genre Success`,
  EditGenreFailure: `[${Features.Genres}] Edit Genre Failure`,
  DeleteGenre: `[${Features.Genres}] Delete Genre`,
  DeleteGenreSuccess: `[${Features.Genres}] Delete Genre Success`,
  DeleteGenreFailure: `[${Features.Genres}] Delete Genre Failure`,
};

export const getAllGenres = createAction(
  GenresActions.GetAllGenres,
  props<{ searchText?: string }>()
);

export const getAllGenresSuccess = createAction(
  GenresActions.GetAllGenresSuccess,
  props<{ genres: Genre[] }>()
);

export const getAllGenresFailure = createAction(
  GenresActions.GetAllGenresFailure,
  props<{ error: HttpErrorResponse }>()
);

export const addGenre = createAction(
  GenresActions.AddGenre,
  props<{ payload: AddGenre }>()
);

export const addGenreSuccess = createAction(GenresActions.AddGenreSuccess);

export const addGenreFailure = createAction(
  GenresActions.AddGenreFailure,
  props<{ error: HttpErrorResponse }>()
);

export const editGenre = createAction(
  GenresActions.EditGenre,
  props<{ payload: EditGenre }>()
);

export const editGenreSuccess = createAction(GenresActions.EditGenreSuccess);

export const editGenreFailure = createAction(
  GenresActions.EditGenreFailure,
  props<{ error: HttpErrorResponse }>()
);

export const deleteGenre = createAction(
  GenresActions.DeleteGenre,
  props<{ id: string }>()
);

export const deleteGenreSuccess = createAction(
  GenresActions.DeleteGenreSuccess
);

export const deleteGenreFailure = createAction(
  GenresActions.DeleteGenreFailure,
  props<{ error: HttpErrorResponse }>()
);
