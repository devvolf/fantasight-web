import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { SnackbarService } from '../../../core/services/snackbar/snackbar.service';
import { WatchablesService } from '../../../core/services/watchables/watchables.service';
import { Watchable } from '../../../shared/models/watchable.model';
import * as WatchablesActions from './watchables.actions';

@Injectable()
export class WatchablesEffects {
  getWatchables$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WatchablesActions.getAllWatchables),
      exhaustMap((action) => {
        const { searchText } = action;
        return this.watchablesService.getAll(searchText).pipe(
          map((watchables: Watchable[]) => {
            return WatchablesActions.getAllWatchablesSuccess({ watchables });
          }),
          catchError((error: HttpErrorResponse) =>
            of(WatchablesActions.getAllWatchablesFailure({ error }))
          )
        );
      })
    )
  );

  watchableFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(WatchablesActions.getAllWatchablesFailure),
        tap((action) => {
          const { error } = action;
          this.snackbarService.error(error.error.message || error.message);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private watchablesService: WatchablesService,
    private snackbarService: SnackbarService
  ) {}
}
