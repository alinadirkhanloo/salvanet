
import { NgModule } from '@angular/core';
import { CourcesComponent } from './cources.component';
import { SharedModule } from 'app/shared/modules/shared.module';
import { DynamicTreeModule } from 'app/core/components/dynamics/dynamic-tree/dynamic-tree.module';
import { DynamicSelectModule } from 'app/core/components/dynamics/dynamic-select/dynamic-select.module';
import { PrimeNgModule } from 'app/shared/modules/primeng/primeng.module';
import { RouterModule, Routes } from '@angular/router';
import { CoursesEditComponent } from './courses-edit/courses-edit.component';
import { AllMaterialModule } from 'app/shared/modules/material/material.module';

const routes: Routes = [
  {
    path: '', component:CourcesComponent,
  },
  {
    path: 'edit/:id',component:CoursesEditComponent
  },
  {
    path:'new',component:CoursesEditComponent
  }
];

@NgModule({
  declarations: [
    CourcesComponent,
    CoursesEditComponent
  ],
  imports: [
    SharedModule,DynamicTreeModule,DynamicSelectModule,PrimeNgModule,
    RouterModule.forChild(routes),AllMaterialModule
  ]
})
export class CourcesModule { }
