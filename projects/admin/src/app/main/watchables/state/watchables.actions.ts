import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Features } from '../../../shared/consts/features.consts';
import { Watchable } from '../../../shared/models/watchable/watchable.model';
import { AddWatchablePayload } from '../../../shared/models/watchable/add-watchable.model';
import { EditWatchable } from '../../../shared/models/watchable/edit-watchable.model';

export const WatchablesActions = {
  GetAllWatchables: `[${Features.Watchables}] Get All Watchables`,
  GetAllWatchablesSuccess: `[${Features.Watchables}] Get All Watchables Success`,
  GetAllWatchablesFailure: `[${Features.Watchables}] Get All Watchables Failure`,
  AddWatchable: `[${Features.Watchables}] Add Watchable`,
  AddWatchableSuccess: `[${Features.Watchables}] Add Watchable Success`,
  AddWatchableFailure: `[${Features.Watchables}] Add Watchable Failure`,
  EditWatchable: `[${Features.Watchables}] Edit Watchable`,
  EditWatchableSuccess: `[${Features.Watchables}] Edit Watchable Success`,
  EditWatchableFailure: `[${Features.Watchables}] Edit Watchable Failure`,
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

export const addWatchable = createAction(
  WatchablesActions.AddWatchable,
  props<{ payload: AddWatchablePayload }>()
);

export const addWatchableSuccess = createAction(
  WatchablesActions.AddWatchableSuccess
);

export const addWatchableFailure = createAction(
  WatchablesActions.AddWatchableFailure,
  props<{ error: HttpErrorResponse }>()
);

export const editWatchable = createAction(
  WatchablesActions.EditWatchable,
  props<{ payload: EditWatchable }>()
);

export const editWatchableSuccess = createAction(
  WatchablesActions.EditWatchableSuccess
);

export const editWatchableFailure = createAction(
  WatchablesActions.EditWatchableFailure,
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
