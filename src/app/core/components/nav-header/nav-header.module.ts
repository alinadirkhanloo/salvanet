import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavHeaderComponent } from 'core/components/nav-header/nav-header.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NavHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavHeaderComponent
  ],
})
export class NavHeaderModule { }
