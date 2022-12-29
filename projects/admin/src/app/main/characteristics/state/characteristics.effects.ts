import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap, tap } from 'rxjs';
import { CharacteristicsService } from '../../../core/services/characteristics/characteristics.service';
import { SnackbarService } from '../../../core/services/snackbar/snackbar.service';
import { Characteristic } from '../../../shared/models/characteristic/characteristic.model';
import * as CharacteristicsActions from './characteristics.actions';

@Injectable()
export class CharacteristicsEffects {
  getCharacteristics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharacteristicsActions.getAllCharacteristics),
      exhaustMap((action) => {
        const { searchText } = action;
        return this.characteristicsService.getAll(searchText).pipe(
          map((characteristics: Characteristic[]) => {
            return CharacteristicsActions.getAllCharacteristicsSuccess({
              characteristics,
            });
          }),
          catchError((error: HttpErrorResponse) =>
            of(CharacteristicsActions.getAllCharacteristicsFailure({ error }))
          )
        );
      })
    )
  );

  addCharacteristic$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharacteristicsActions.addCharacteristic),
      exhaustMap((action) => {
        const { payload } = action;
        return this.characteristicsService.add(payload).pipe(
          map(() => {
            return CharacteristicsActions.addCharacteristicSuccess();
          }),
          catchError((error: HttpErrorResponse) =>
            of(CharacteristicsActions.addCharacteristicFailure({ error }))
          )
        );
      })
    )
  );

  addCharacteristicSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CharacteristicsActions.addCharacteristicSuccess),
        tap(() => {
          this.snackbarService.success('New characteristic created successfully!');
          this.router.navigateByUrl('main/characteristics');
        })
      ),
    { dispatch: false }
  );

  editCharacteristic$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharacteristicsActions.editCharacteristic),
      exhaustMap((action) => {
        const { payload } = action;
        return this.characteristicsService.edit(payload).pipe(
          map(() => {
            return CharacteristicsActions.editCharacteristicSuccess();
          }),
          catchError((error: HttpErrorResponse) =>
            of(CharacteristicsActions.editCharacteristicFailure({ error }))
          )
        );
      })
    )
  );

  editCharacteristicSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CharacteristicsActions.editCharacteristicSuccess),
        tap(() => {
          this.snackbarService.success('Characteristic edited successfully!');
          this.router.navigateByUrl('main/characteristics');
        })
      ),
    { dispatch: false }
  );

  deleteCharacteristic$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharacteristicsActions.deleteCharacteristic),
      exhaustMap((action) => {
        const { id } = action;
        return this.characteristicsService.delete(id).pipe(
          switchMap(() => {
            return [
              CharacteristicsActions.deleteCharacteristicSuccess(),
              CharacteristicsActions.getAllCharacteristics({}),
            ];
          }),
          catchError((error: HttpErrorResponse) =>
            of(CharacteristicsActions.deleteCharacteristicFailure({ error }))
          )
        );
      })
    )
  );

  deleteCharacteristicSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CharacteristicsActions.deleteCharacteristicSuccess),
        tap(() => {
          this.snackbarService.success('Characteristic deleted successfully!');
          this.router.navigateByUrl('main/characteristics');
        })
      ),
    { dispatch: false }
  );

  characteristicFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          CharacteristicsActions.addCharacteristicFailure,
          CharacteristicsActions.editCharacteristicFailure,
          CharacteristicsActions.deleteCharacteristicFailure
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
    private characteristicsService: CharacteristicsService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}
}
