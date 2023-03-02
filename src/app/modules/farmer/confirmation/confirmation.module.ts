import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationComponent } from './confirmation.component';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [
    ConfirmationComponent
  ],
  imports: [
    CommonModule,RouterModule.forChild([{path:'',component:ConfirmationComponent}]),ButtonModule
  ]
})
export class ConfirmationModule { }
