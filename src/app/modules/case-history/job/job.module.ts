import { JobEditComponent } from './job-edit/job-edit.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


import { JobComponent } from './job.component';
import { SharedModule } from 'app/shared/modules/shared.module';


const routes: Routes = [
  {
    path: '', component:JobComponent,
  },
  {
    path: 'edit/:id',component:JobEditComponent
  },
  {
    path:'new',component:JobEditComponent
  }
];


@NgModule({
  declarations: [
    JobComponent,JobEditComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class JobModule { }
