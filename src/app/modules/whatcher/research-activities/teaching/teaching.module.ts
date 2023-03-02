import { TeachingEditComponent } from './teaching/teaching-edit.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


import { SharedModule } from 'app/shared/modules/shared.module';
import { AllMaterialModule } from 'app/shared/modules/material/material.module';


const routes: Routes = [
  {
    path:'',component:TeachingEditComponent
  }
];


@NgModule({
  declarations: [
    TeachingEditComponent
  ],
  imports: [
    SharedModule,AllMaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class TeachingModule { }
