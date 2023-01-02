import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap, tap, zip } from 'rxjs';
import { SnackbarService } from '../../../core/services/snackbar/snackbar.service';
import { StorageService } from '../../../core/services/storage/storage.service';
import { WatchablesService } from '../../../core/services/watchables/watchables.service';
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

  addFilm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WatchablesActions.addFilm),
      exhaustMap((action) => {
        const { payload } = action;

        return zip([
          this.storageService.uploadImages([payload.posterImage]),
          this.storageService.uploadVideos([payload.video]),
        ]).pipe(
          switchMap(([imageResponse, videoResponse]: [any, any]) => {
            const request = {
              ...payload,
              year: Number.parseInt(payload.year),
              imageId: imageResponse[0].id,
              videoId: videoResponse[0].id,
            };

            return this.watchablesService.addFilm(request).pipe(
              map(() => WatchablesActions.addFilmSuccess()),
              catchError((error: HttpErrorResponse) =>
                of(WatchablesActions.addFilmFailure({ error }))
              )
            );
          })
        );
      })
    )
  );

  addFilmSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(WatchablesActions.addFilmSuccess),
        tap(() => {
          this.snackbarService.success('New film created successfully!');
          this.router.navigateByUrl('main/watchables');
        })
      ),
    { dispatch: false }
  );

  addSerie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WatchablesActions.addSerie),
      exhaustMap((action) => {
        const { payload } = action;

        const images = [
          payload.posterImage,
          ...payload.episodes.map((it) => it.posterImage),
        ];
        const videos = payload.episodes.map((it) => it.video);

        return zip([
          this.storageService.uploadImages(images),
          this.storageService.uploadVideos(videos),
        ]).pipe(
          switchMap(([imagesResponse, videosResponse]: [any, any]) => {
            const episodesRequest = payload.episodes.map((it, index) => ({
              title: it.title,
              description: it.description,
              seasonIndex: it.seasonIndex,
              posterImageId: imagesResponse[index + 1].id,
              videoId: videosResponse[index].id,
            }));

            const request = {
              title: payload.title,
              description: payload.description,
              year: payload.year,
              genreIds: payload.genreIds,
              characteristicIds: payload.characteristicIds,
              posterImageId: imagesResponse[0].id,
              episodes: episodesRequest,
            };

            return this.watchablesService.addSerie(request).pipe(
              map(() => WatchablesActions.addSerieSuccess()),
              catchError((error: HttpErrorResponse) =>
                of(WatchablesActions.addSerieFailure({ error }))
              )
            );
          })
        );
      })
    )
  );

  addSerieSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(WatchablesActions.addSerieSuccess),
        tap(() => {
          this.snackbarService.success('New serie created successfully!');
          this.router.navigateByUrl('main/watchables');
        })
      ),
    { dispatch: false }
  );

  editFilm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WatchablesActions.editFilm),
      exhaustMap((action) => {
        const { payload } = action;

        if (payload.posterImage && !payload.video) {
          return this.storageService.uploadImages([payload.posterImage]).pipe(
            switchMap((imageResponse: any) => {
              const request = {
                ...payload,
                imageId: imageResponse[0].id,
              };

              return this.watchablesService.editFilm(request).pipe(
                map(() => {
                  return WatchablesActions.editFilmSuccess();
                }),
                catchError((error: HttpErrorResponse) =>
                  of(WatchablesActions.editFilmFailure({ error }))
                )
              );
            })
          );
        }

        if (!payload.posterImage && payload.video) {
          return this.storageService.uploadVideos([payload.video]).pipe(
            switchMap((videoResponse: any) => {
              const request = {
                ...payload,
                videoId: videoResponse[0].id,
              };

              return this.watchablesService.editFilm(request).pipe(
                map(() => {
                  return WatchablesActions.editFilmSuccess();
                }),
                catchError((error: HttpErrorResponse) =>
                  of(WatchablesActions.editFilmFailure({ error }))
                )
              );
            })
          );
        }

        if (payload.posterImage && payload.video) {
          return zip([
            this.storageService.uploadImages([payload.posterImage]),
            this.storageService.uploadVideos([payload.video]),
          ]).pipe(
            switchMap(([imageResponse, videoResponse]: [any, any]) => {
              const request = {
                ...payload,
                imageId: imageResponse[0].id,
                videoId: videoResponse[0].id,
              };

              return this.watchablesService.editFilm(request).pipe(
                map(() => {
                  return WatchablesActions.editFilmSuccess();
                }),
                catchError((error: HttpErrorResponse) =>
                  of(WatchablesActions.editFilmFailure({ error }))
                )
              );
            })
          );
        }

        return this.watchablesService.editFilm(payload).pipe(
          map(() => {
            return WatchablesActions.editFilmSuccess();
          }),
          catchError((error: HttpErrorResponse) =>
            of(WatchablesActions.editFilmFailure({ error }))
          )
        );
      })
    )
  );

  editFilmSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(WatchablesActions.editFilmSuccess),
        tap(() => {
          this.snackbarService.success('Film edited successfully!');
          this.router.navigateByUrl('main/watchables');
        })
      ),
    { dispatch: false }
  );

  deleteWatchable$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WatchablesActions.deleteWatchable),
      exhaustMap((action) => {
        const { id } = action;
        return this.watchablesService.delete(id).pipe(
          switchMap(() => {
            return [
              WatchablesActions.deleteWatchableSuccess(),
              WatchablesActions.getAllWatchables({}),
            ];
          }),
          catchError((error: HttpErrorResponse) =>
            of(WatchablesActions.deleteWatchableFailure({ error }))
          )
        );
      })
    )
  );

  deleteWatchableSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(WatchablesActions.deleteWatchableSuccess),
        tap(() => {
          this.snackbarService.success('Watchable deleted successfully!');
          this.router.navigateByUrl('main/watchables');
        })
      ),
    { dispatch: false }
  );

  watchableFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          WatchablesActions.addFilmFailure,
          WatchablesActions.editFilmFailure,
          WatchablesActions.addSerieFailure,
          WatchablesActions.editSerieFailure,
          WatchablesActions.deleteWatchableFailure
        ),
        tap((action) => {
          const { error } = action;
          this.snackbarService.error(error.error.message || error.message);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private storageService: StorageService,
    private watchablesService: WatchablesService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}
}
