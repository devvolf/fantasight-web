import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Features } from '../../../shared/consts/features.consts';
import { Watchable } from '../../../shared/models/watchable/watchable.model';
import { FilmPayload } from '../../../shared/models/watchable/film/film.model';
import { SeriePayload } from '../../../shared/models/watchable/serie/serie.model';

export const WatchablesActions = {
  GetAllWatchables: `[${Features.Watchables}] Get All Watchables`,
  GetAllWatchablesSuccess: `[${Features.Watchables}] Get All Watchables Success`,
  GetAllWatchablesFailure: `[${Features.Watchables}] Get All Watchables Failure`,
  AddFilm: `[${Features.Watchables}] Add Film`,
  AddFilmSuccess: `[${Features.Watchables}] Add Film Success`,
  AddFilmFailure: `[${Features.Watchables}] Add Film Failure`,
  EditFilm: `[${Features.Watchables}] Edit Film`,
  EditFilmSuccess: `[${Features.Watchables}] Edit Film Success`,
  EditFilmFailure: `[${Features.Watchables}] Edit Film Failure`,
  AddSerie: `[${Features.Watchables}] Add Serie`,
  AddSerieSuccess: `[${Features.Watchables}] Add Serie Success`,
  AddSerieFailure: `[${Features.Watchables}] Add Serie Failure`,
  EditSerie: `[${Features.Watchables}] Edit Serie`,
  EditSerieSuccess: `[${Features.Watchables}] Edit Serie Success`,
  EditSerieFailure: `[${Features.Watchables}] Edit Serie Failure`,
  DeleteWatchable: `[${Features.Watchables}] Delete Watchable`,
  DeleteWatchableSuccess: `[${Features.Watchables}] Delete Watchable Success`,
  DeleteWatchableFailure: `[${Features.Watchables}] Delete Watchable Failure`,
};

export const getAllWatchables = createAction(
  WatchablesActions.GetAllWatchables,
  props<{ searchText?: string }>()
);

export const getAllWatchablesSuccess = createAction(
  WatchablesActions.GetAllWatchablesSuccess,
  props<{ watchables: Watchable[] }>()
);

export const getAllWatchablesFailure = createAction(
  WatchablesActions.GetAllWatchablesFailure,
  props<{ error: HttpErrorResponse }>()
);

export const addFilm = createAction(
  WatchablesActions.AddFilm,
  props<{ payload: FilmPayload }>()
);

export const addFilmSuccess = createAction(WatchablesActions.AddFilmSuccess);

export const addFilmFailure = createAction(
  WatchablesActions.AddFilmFailure,
  props<{ error: HttpErrorResponse }>()
);

export const editFilm = createAction(
  WatchablesActions.EditFilm,
  props<{ payload: FilmPayload }>()
);

export const editFilmSuccess = createAction(WatchablesActions.EditFilmSuccess);

export const editFilmFailure = createAction(
  WatchablesActions.EditFilmFailure,
  props<{ error: HttpErrorResponse }>()
);

export const addSerie = createAction(
  WatchablesActions.AddSerie,
  props<{ payload: SeriePayload }>()
);

export const addSerieSuccess = createAction(WatchablesActions.AddSerieSuccess);

export const addSerieFailure = createAction(
  WatchablesActions.AddSerieFailure,
  props<{ error: HttpErrorResponse }>()
);

export const editSerie = createAction(
  WatchablesActions.EditSerie,
  props<{ payload: SeriePayload }>()
);

export const editSerieSuccess = createAction(
  WatchablesActions.EditSerieSuccess
);

export const editSerieFailure = createAction(
  WatchablesActions.EditSerieFailure,
  props<{ error: HttpErrorResponse }>()
);

export const deleteWatchable = createAction(
  WatchablesActions.DeleteWatchable,
  props<{ id: string }>()
);

export const deleteWatchableSuccess = createAction(
  WatchablesActions.DeleteWatchableSuccess
);

export const deleteWatchableFailure = createAction(
  WatchablesActions.DeleteWatchableFailure,
  props<{ error: HttpErrorResponse }>()
);
