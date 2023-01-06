import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WatchablesRoutingModule } from './watchables-routing.module';
import { WatchablesComponent } from './watchables.component';
import { WatchableModule } from '../../shared/components/watchable/watchable.module';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Features } from '../../shared/consts/features.consts';
import { watchablesReducer } from './state/watchables.reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { WatchablesEffects } from './state/watchables.effects';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { WatchableInfoModule } from '../watchable-info/watchable-info.module';

@NgModule({
  declarations: [WatchablesComponent],
  imports: [
    // StoreModule.forFeature(Features.Watchables, watchablesReducer),
    // EffectsModule.forFeature([WatchablesEffects]),
    CommonModule,
    WatchablesRoutingModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule,
    FormsModule,
    WatchableModule,
    WatchableInfoModule,
  ],
})
export class WatchablesModule {}
