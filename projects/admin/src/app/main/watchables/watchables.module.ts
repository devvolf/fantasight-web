import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WatchablesRoutingModule } from './watchables-routing.module';
import { WatchablesComponent } from './watchables.component';
import { WatchableModule } from '../../shared/components/watchable/watchable.module';
import { MatButtonModule } from '@angular/material/button';
import { AddWatchableComponent } from './add-watchable/add-watchable.component';
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
import { FilmFormComponent } from './film-form/film-form.component';
import { SerieFormComponent } from './serie-form/serie-form.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { SerieEpisodeFormComponent } from './serie-form/serie-episode-form/serie-episode-form.component';
import { EditWatchableComponent } from './edit-watchable/edit-watchable.component';

@NgModule({
  declarations: [
    WatchablesComponent,
    AddWatchableComponent,
    FilmFormComponent,
    SerieFormComponent,
    SerieEpisodeFormComponent,
    EditWatchableComponent,
  ],
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
    MatTableModule,
    MatDialogModule,
    FormsModule,
  ],
})
export class WatchablesModule {}
