import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WatchablesRoutingModule } from './watchables-routing.module';
import { WatchablesComponent } from './watchables.component';
import { WatchableModule } from '../../shared/components/watchable/watchable.module';
import { MatButtonModule } from '@angular/material/button';
import { AddWatchableComponent } from './add-watchable/add-watchable.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Features } from '../../shared/consts/features.consts';
import { watchablesReducer } from './state/watchables.reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { WatchablesEffects } from './state/watchables.effects';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [WatchablesComponent, AddWatchableComponent],
  imports: [
    // StoreModule.forFeature(Features.Watchables, watchablesReducer),
    // EffectsModule.forFeature([WatchablesEffects]),
    CommonModule,
    WatchablesRoutingModule,
    WatchableModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
  ],
})
export class WatchablesModule {}
