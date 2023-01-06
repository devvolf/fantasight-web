import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Features } from '../../../shared/consts/features.consts';
import { Watchable } from '../../../shared/models/watchable.model';
// import { Watchable } from '../../../shared/models/watchable/watchable.model';
// import { FilmPayload } from '../../../shared/models/watchable/film/film.model';
// import { SeriePayload } from '../../../shared/models/watchable/serie/serie.model';

export const WatchablesActions = {
  GetAllWatchables: `[${Features.Watchables}] Get All Watchables`,
  GetAllWatchablesSuccess: `[${Features.Watchables}] Get All Watchables Success`,
  GetAllWatchablesFailure: `[${Features.Watchables}] Get All Watchables Failure`,
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
