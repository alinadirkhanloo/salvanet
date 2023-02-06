import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { EducationalRecordsComponent } from './educational-records.component';
import { SharedModule } from 'app/shared/modules/shared.module';
import { EducationalRecordsEditComponent } from './educational-records-edit/educational-records-edit.component';

const routes: Routes = [
  {
    path: '', component:EducationalRecordsComponent,
  },
  {
    path: 'edit/:id',component:EducationalRecordsEditComponent
  },
  {
    path:'new',component:EducationalRecordsEditComponent
  }
];


@NgModule({
  declarations: [
    EducationalRecordsComponent,EducationalRecordsEditComponent
  ],
  imports: [
    SharedModule,RouterModule.forChild(routes)
  ]
})
export class EducationalRecordsModule { }