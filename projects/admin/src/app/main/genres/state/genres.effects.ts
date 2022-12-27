import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap, tap } from 'rxjs';
import { GenresService } from '../../../core/services/genres/genres.service';
import { SnackbarService } from '../../../core/services/snackbar/snackbar.service';
import { Genre } from '../../../shared/models/genre.model';
import * as GenresActions from './genres.actions';

@Injectable()
export class GenresEffects {
  getGenres$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GenresActions.getAllGenres),
      exhaustMap((action) => {
        console.log(action);
        const { searchText } = action;
        return this.genresService.getAll(searchText).pipe(
          map((genres: Genre[]) => {
            return GenresActions.getAllGenresSuccess({ genres });
          }),
          catchError((error: HttpErrorResponse) =>
            of(GenresActions.getAllGenresFailure({ error }))
          )
        );
      })
    )
  );

  addGenre$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GenresActions.addGenre),
      exhaustMap((action) => {
        const { payload } = action;
        return this.genresService.add(payload).pipe(
          map(() => {
            return GenresActions.addGenreSuccess();
          }),
          catchError((error: HttpErrorResponse) =>
            of(GenresActions.addGenreFailure({ error }))
          )
        );
      })
    )
  );

  addGenreSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GenresActions.addGenreSuccess),
        tap(() => {
          this.snackbarService.success('New genre created successfully!');
          this.router.navigateByUrl('main/genres');
        })
      ),
    { dispatch: false }
  );

  editGenre$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GenresActions.editGenre),
      exhaustMap((action) => {
        const { payload } = action;
        return this.genresService.edit(payload).pipe(
          map(() => {
            return GenresActions.addGenreSuccess();
          }),
          catchError((error: HttpErrorResponse) =>
            of(GenresActions.editGenreFailure({ error }))
          )
        );
      })
    )
  );

  editGenreSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GenresActions.editGenreSuccess),
        tap(() => {
          this.snackbarService.success('Genre edited successfully!');
          this.router.navigateByUrl('main/genres');
        })
      ),
    { dispatch: false }
  );

  deleteGenre$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GenresActions.deleteGenre),
      exhaustMap((action) => {
        const { id } = action;
        return this.genresService.delete(id).pipe(
          switchMap(() => {
            return [
              GenresActions.deleteGenreSuccess(),
              GenresActions.getAllGenres({}),
            ];
          }),
          catchError((error: HttpErrorResponse) =>
            of(GenresActions.deleteGenreFailure({ error }))
          )
        );
      })
    )
  );

  deleteGenreSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GenresActions.deleteGenreSuccess),
        tap(() => {
          this.snackbarService.success('Genre deleted successfully!');
          this.router.navigateByUrl('main/genres');
        })
      ),
    { dispatch: false }
  );

  genreFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          GenresActions.addGenreFailure,
          GenresActions.editGenreFailure,
          GenresActions.deleteGenreFailure
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
    private genresService: GenresService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}
}
