import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: '/main/watchables',
        pathMatch: 'full',
      },
      {
        path: 'watchables',
        loadChildren: () =>
          import('./watchables/watchables.module').then(
            (m) => m.WatchablesModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
