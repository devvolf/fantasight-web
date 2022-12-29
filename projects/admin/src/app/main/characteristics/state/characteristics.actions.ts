import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Features } from '../../../shared/consts/features.consts';
import { AddCharacteristic } from '../../../shared/models/characteristic/add-characteristic.model';
import { Characteristic } from '../../../shared/models/characteristic/characteristic.model';
import { EditCharacteristic } from '../../../shared/models/characteristic/edit-characteristic.model';

export const CharacteristicsActions = {
  GetAllCharacteristics: `[${Features.Characteristics}] Get All Characteristics`,
  GetAllCharacteristicsSuccess: `[${Features.Characteristics}] Get All Characteristics Success`,
  GetAllCharacteristicsFailure: `[${Features.Characteristics}] Get All Characteristics Failure`,
  AddCharacteristic: `[${Features.Characteristics}] Add Characteristic`,
  AddCharacteristicSuccess: `[${Features.Characteristics}] Add Characteristic Success`,
  AddCharacteristicFailure: `[${Features.Characteristics}] Add Characteristic Failure`,
  EditCharacteristic: `[${Features.Characteristics}] Edit Characteristic`,
  EditCharacteristicSuccess: `[${Features.Characteristics}] Edit Characteristic Success`,
  EditCharacteristicFailure: `[${Features.Characteristics}] Edit Characteristic Failure`,
  DeleteCharacteristic: `[${Features.Characteristics}] Delete Characteristic`,
  DeleteCharacteristicSuccess: `[${Features.Characteristics}] Delete Characteristic Success`,
  DeleteCharacteristicFailure: `[${Features.Characteristics}] Delete Characteristic Failure`,
};

export const getAllCharacteristics = createAction(
  CharacteristicsActions.GetAllCharacteristics,
  props<{ searchText?: string }>()
);

export const getAllCharacteristicsSuccess = createAction(
  CharacteristicsActions.GetAllCharacteristicsSuccess,
  props<{ characteristics: Characteristic[] }>()
);

export const getAllCharacteristicsFailure = createAction(
  CharacteristicsActions.GetAllCharacteristicsFailure,
  props<{ error: HttpErrorResponse }>()
);

export const addCharacteristic = createAction(
  CharacteristicsActions.AddCharacteristic,
  props<{ payload: AddCharacteristic }>()
);

export const addCharacteristicSuccess = createAction(
  CharacteristicsActions.AddCharacteristicSuccess
);

export const addCharacteristicFailure = createAction(
  CharacteristicsActions.AddCharacteristicFailure,
  props<{ error: HttpErrorResponse }>()
);

export const editCharacteristic = createAction(
  CharacteristicsActions.EditCharacteristic,
  props<{ payload: EditCharacteristic }>()
);

export const editCharacteristicSuccess = createAction(
  CharacteristicsActions.EditCharacteristicSuccess
);

export const editCharacteristicFailure = createAction(
  CharacteristicsActions.EditCharacteristicFailure,
  props<{ error: HttpErrorResponse }>()
);

export const deleteCharacteristic = createAction(
  CharacteristicsActions.DeleteCharacteristic,
  props<{ id: string }>()
);

export const deleteCharacteristicSuccess = createAction(
  CharacteristicsActions.DeleteCharacteristicSuccess
);

export const deleteCharacteristicFailure = createAction(
  CharacteristicsActions.DeleteCharacteristicFailure,
  props<{ error: HttpErrorResponse }>()
);
