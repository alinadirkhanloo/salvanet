
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/modules/shared.module';
import { AllMaterialModule } from 'app/shared/modules/material/material.module';
import { JobEditComponent } from './job-edit.component';


const routes: Routes = [
  {
    path:'',component:JobEditComponent
  }
];


@NgModule({
  declarations: [
    JobEditComponent
  ],
  imports: [
    SharedModule,AllMaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class JobModule { }
