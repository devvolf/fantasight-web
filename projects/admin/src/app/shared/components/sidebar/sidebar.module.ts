import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [SidebarComponent],
  imports: [CommonModule, MatIconModule, MatListModule],
  exports: [SidebarComponent],
})
export class SidebarModule {}
