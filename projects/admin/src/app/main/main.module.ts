import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ToolbarModule } from '../shared/components/toolbar/toolbar.module';
import { SidebarModule } from '../shared/components/sidebar/sidebar.module';

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatSidenavModule,
    ToolbarModule,
    SidebarModule,
  ],
})
export class MainModule {}
