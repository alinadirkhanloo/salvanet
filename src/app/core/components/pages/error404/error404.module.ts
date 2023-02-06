import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404Component } from 'core/components/pages/error404/error404.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    Error404Component
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    Error404Component
  ]
})
export class Error404Module { }
