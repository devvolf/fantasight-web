import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap, tap, zip } from 'rxjs';
import { internalLoginError } from '../../../auth/state/auth.actions';
import { SnackbarService } from '../../../core/services/snackbar/snackbar.service';
import { StorageService } from '../../../core/services/storage/storage.service';
import { WatchablesService } from '../../../core/services/watchables/watchables.service';
import { AddWatchable } from '../../../shared/models/watchable/add-watchable.model';
import { Watchable } from '../../../shared/models/watchable/watchable.model';
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

  addWatchable$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WatchablesActions.addWatchable),
      exhaustMap((action) => {
        const { payload } = action;

        return zip([
          this.storageService.uploadImage(payload.image),
          this.storageService.uploadVideo(payload.video),
        ]).pipe(
          switchMap(([imageResponse, videoResponse]: [any, any]) => {
            const request = {
              ...payload,
              year: Number.parseInt(payload.year),
              imageId: imageResponse.id,
              videoId: videoResponse.id,
            } as AddWatchable;

            return this.watchablesService.addFilm(request).pipe(
              map(() => WatchablesActions.addWatchableSuccess()),
              catchError((error: HttpErrorResponse) =>
                of(WatchablesActions.addWatchableFailure({ error }))
              )
            );
          })
        );
      })
    )
  );

  addWatchableSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(WatchablesActions.addWatchableSuccess),
        tap(() => {
          this.snackbarService.success('New watchable created successfully!');
          this.router.navigateByUrl('main/watchables');
        })
      ),
    { dispatch: false }
  );

  // editGenre$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(GenresActions.editGenre),
  //     exhaustMap((action) => {
  //       const { payload } = action;
  //       return this.genresService.edit(payload).pipe(
  //         map(() => {
  //           return GenresActions.editGenreSuccess();
  //         }),
  //         catchError((error: HttpErrorResponse) =>
  //           of(GenresActions.editGenreFailure({ error }))
  //         )
  //       );
  //     })
  //   )
  // );

  // editGenreSuccess$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(GenresActions.editGenreSuccess),
  //       tap(() => {
  //         this.snackbarService.success('Genre edited successfully!');
  //         this.router.navigateByUrl('main/genres');
  //       })
  //     ),
  //   { dispatch: false }
  // );

  // deleteGenre$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(GenresActions.deleteGenre),
  //     exhaustMap((action) => {
  //       const { id } = action;
  //       return this.genresService.delete(id).pipe(
  //         switchMap(() => {
  //           return [
  //             GenresActions.deleteGenreSuccess(),
  //             GenresActions.getAllGenres({}),
  //           ];
  //         }),
  //         catchError((error: HttpErrorResponse) =>
  //           of(GenresActions.deleteGenreFailure({ error }))
  //         )
  //       );
  //     })
  //   )
  // );

  // deleteGenreSuccess$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(GenresActions.deleteGenreSuccess),
  //       tap(() => {
  //         this.snackbarService.success('Genre deleted successfully!');
  //         this.router.navigateByUrl('main/genres');
  //       })
  //     ),
  //   { dispatch: false }
  // );

  // genreFailure$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(
  //         GenresActions.addGenreFailure,
  //         GenresActions.editGenreFailure,
  //         GenresActions.deleteGenreFailure
  //       ),
  //       tap((action) => {
  //         const { error } = action;
  //         this.snackbarService.error(error.error.message || error.message);
  //       })
  //     ),
  //   { dispatch: false }
  // );

  constructor(
    private actions$: Actions,
    private storageService: StorageService,
    private watchablesService: WatchablesService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}
}
