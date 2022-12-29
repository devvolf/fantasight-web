import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacteristicsRoutingModule } from './characteristics-routing.module';
import { CharacteristicsComponent } from './characteristics.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { Features } from '../../shared/consts/features.consts';
import { characteristicsReducer } from './state/characteristics.reducers';
import { CharacteristicsEffects } from './state/characteristics.effects';
import { AddCharacteristicComponent } from './add-characteristic/add-characteristic.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { EditCharacteristicComponent } from './edit-characteristic/edit-characteristic.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CharacteristicsComponent,
    AddCharacteristicComponent,
    EditCharacteristicComponent,
  ],
  imports: [
    StoreModule.forFeature(Features.Characteristics, characteristicsReducer),
    EffectsModule.forFeature([CharacteristicsEffects]),
    CommonModule,
    CharacteristicsRoutingModule,
    MatTableModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
  ],
})
export class CharacteristicsModule {}
