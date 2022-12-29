import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCharacteristicComponent } from './add-characteristic/add-characteristic.component';
import { EditCharacteristicComponent } from './edit-characteristic/edit-characteristic.component';
import { CharacteristicsComponent } from './characteristics.component';

const routes: Routes = [
  {
    path: '',
    component: CharacteristicsComponent,
  },
  {
    path: 'add',
    component: AddCharacteristicComponent,
  },
  {
    path: ':id/edit',
    component: EditCharacteristicComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharacteristicsRoutingModule {}
