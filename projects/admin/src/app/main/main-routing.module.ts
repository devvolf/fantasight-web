import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'watchables',
        loadChildren: () =>
          import('./watchables/watchables.module').then(
            (m) => m.WatchablesModule
          ),
      },
      {
        path: 'genres',
        loadChildren: () =>
          import('./genres/genres.module').then((m) => m.GenresModule),
      },
      {
        path: 'characteristics',
        loadChildren: () =>
          import('./characteristics/characteristics.module').then((m) => m.CharacteristicsModule),
      },
      {
        path: '',
        redirectTo: '/main',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
