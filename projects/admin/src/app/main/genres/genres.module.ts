import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenresRoutingModule } from './genres-routing.module';
import { GenresComponent } from './genres.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { Features } from '../../shared/consts/features.consts';
import { genresReducer } from './state/genres.reducers';
import { GenresEffects } from './state/genres.effects';
import { AddGenreComponent } from './add-genre/add-genre.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { EditGenreComponent } from './edit-genre/edit-genre.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [GenresComponent, AddGenreComponent, EditGenreComponent],
  imports: [
    // StoreModule.forFeature(Features.Genres, genresReducer),
    // EffectsModule.forFeature([GenresEffects]),
    CommonModule,
    GenresRoutingModule,
    MatTableModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
  ],
})
export class GenresModule {}
