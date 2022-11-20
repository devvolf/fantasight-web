import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatchableComponent } from './watchable.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [WatchableComponent],
  imports: [CommonModule, MatCardModule, MatButtonModule],
  exports: [WatchableComponent],
})
export class WatchableModule {}
