import { DynamicSelectModule } from 'core/components/dynamics/dynamic-select/dynamic-select.module';
import { DynamicPickListModule } from 'core/components/dynamics/dynamic-pick-list/dynamic-pick-list.module';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/modules/shared.module';
import { NgModule } from '@angular/core';
import { RegistrationAnnouncementComponent } from './registration-announcement.component';
import { RegistrationAnnouncementEditComponent } from './registration-announcement-edit/registration-announcement-edit.component';
import { AllMaterialModule } from 'app/shared/modules/material/material.module';
import { PrimeNgModule } from 'app/shared/modules/primeng/primeng.module';
import { DatePickerModule } from 'app/core/components/dynamics/date-picker/date-picker.module';

const routes: Routes = [
  {
    path: '', component: RegistrationAnnouncementComponent
  },
  {
    path: 'edit/:id',component:RegistrationAnnouncementEditComponent
  },
  {
    path:'new',component:RegistrationAnnouncementEditComponent
  }
];


@NgModule({
  declarations: [
    RegistrationAnnouncementComponent,
    RegistrationAnnouncementEditComponent
  ],
  imports: [
    SharedModule,AllMaterialModule,PrimeNgModule,DynamicPickListModule,DynamicSelectModule,
    RouterModule.forChild(routes),DatePickerModule
  ]
})
export class RegistrationAnnouncementModule { }
