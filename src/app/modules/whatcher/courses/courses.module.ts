
import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/modules/shared.module';
import { DynamicTreeModule } from 'app/core/components/dynamics/dynamic-tree/dynamic-tree.module';
import { DynamicSelectModule } from 'app/core/components/dynamics/dynamic-select/dynamic-select.module';
import { PrimeNgModule } from 'app/shared/modules/primeng/primeng.module';
import { RouterModule, Routes } from '@angular/router';
import { AllMaterialModule } from 'app/shared/modules/material/material.module';
import { CoursesEditComponent } from './courses-edit.component';

const routes: Routes = [
  {
    path:'',component:CoursesEditComponent
  }
];

@NgModule({
  declarations: [
    CoursesEditComponent
  ],
  imports: [
    SharedModule,DynamicTreeModule,DynamicSelectModule,PrimeNgModule,
    RouterModule.forChild(routes),AllMaterialModule
  ]
})
export class CoursesModule { }
