import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Features } from '../../../shared/consts/features.consts';
import { CharacteristicsState } from './characteristics.reducers';

const getCharacteristicsState = createFeatureSelector<CharacteristicsState>(Features.Characteristics);

export const characteristics = createSelector(
  getCharacteristicsState,
  (state: CharacteristicsState) => state.characteristics
);

export const characteristic = (id: string) =>
  createSelector(getCharacteristicsState, (state: CharacteristicsState) => {
    return state.characteristics.find((it) => it._id === id);
  });
