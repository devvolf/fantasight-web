import { createReducer, on } from '@ngrx/store';
import { Characteristic } from '../../../shared/models/characteristic/characteristic.model';
import {
  addCharacteristic,
  addCharacteristicFailure,
  addCharacteristicSuccess,
  getAllCharacteristics,
  getAllCharacteristicsFailure,
  getAllCharacteristicsSuccess,
} from './characteristics.actions';

export interface CharacteristicsState {
  characteristics: Characteristic[];
  isProcessing: boolean;
}

export const initialState = {
  characteristics: [],
  isProcessing: false,
};

export const characteristicsReducer = createReducer<CharacteristicsState>(
  initialState,
  on(getAllCharacteristics, (state) => ({
    ...state,
    isProcessing: true,
  })),
  on(getAllCharacteristicsSuccess, (state, { characteristics }) => ({
    ...state,
    isProcessing: false,
    characteristics,
  })),
  on(getAllCharacteristicsFailure, (state) => ({
    ...state,
    isProcessing: false,
  })),
  on(addCharacteristic, (state) => ({
    ...state,
    isProcessing: true,
  })),
  on(addCharacteristicSuccess, (state) => ({
    ...state,
    isProcessing: false,
  })),
  on(addCharacteristicFailure, (state) => ({
    ...state,
    isProcessing: false,
  }))
);
