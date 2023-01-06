import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatchableInfoComponent } from './watchable-info.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [WatchableInfoComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatSelectModule],
  exports: [MatButtonModule, MatIconModule]
})
export class WatchableInfoModule {}
