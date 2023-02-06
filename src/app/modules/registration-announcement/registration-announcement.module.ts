import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/modules/shared.module';
import { NgModule } from '@angular/core';
import { RegistrationAnnouncementComponent } from './registration-announcement.component';
import { RegistrationAnnouncementEditComponent } from './registration-announcement-edit/registration-announcement-edit.component';

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
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class RegistrationAnnouncementModule { }
