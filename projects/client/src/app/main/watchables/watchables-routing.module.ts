import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { WatchablesComponent } from './watchables.component';

const routes: Routes = [
  {
    path: '',
    component: WatchablesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WatchablesRoutingModule {}
