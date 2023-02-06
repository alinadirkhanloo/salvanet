import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/modules/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentComponent } from './appointment.component';
import { AppointmentEditComponent } from './appointment-edit/appointment-edit.component';

const routes: Routes = [
  {
    path: '', component:AppointmentComponent,
  },
  {
    path: 'edit/:id',component:AppointmentEditComponent
  },
  {
    path:'new',component:AppointmentEditComponent
  }
];

@NgModule({
  declarations: [
    AppointmentComponent,AppointmentEditComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class AppointmentModule { }
