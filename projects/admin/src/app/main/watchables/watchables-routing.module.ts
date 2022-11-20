import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddWatchableComponent } from './add-watchable/add-watchable.component';
import { WatchablesComponent } from './watchables.component';

const routes: Routes = [
  {
    path: '',
    component: WatchablesComponent,
  },
  {
    path: 'add',
    component: AddWatchableComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WatchablesRoutingModule {}
