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

@NgModule({
  declarations: [WatchablesComponent, AddWatchableComponent],
  imports: [
    CommonModule,
    WatchablesRoutingModule,
    WatchableModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
})
export class WatchablesModule {}
