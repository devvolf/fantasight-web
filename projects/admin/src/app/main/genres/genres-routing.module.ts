import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddGenreComponent } from './add-genre/add-genre.component';
import { EditGenreComponent } from './edit-genre/edit-genre.component';
import { GenresComponent } from './genres.component';

const routes: Routes = [
  {
    path: '',
    component: GenresComponent,
  },
  {
    path: 'add',
    component: AddGenreComponent,
  },
  {
    path: ':id/edit',
    component: EditGenreComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenresRoutingModule {}
