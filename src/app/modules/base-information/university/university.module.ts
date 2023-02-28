import { UniversityComponent } from './university.component';

import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/modules/shared.module';
import { PrimeNgModule } from 'app/shared/modules/primeng/primeng.module';
import { AllMaterialModule } from 'app/shared/modules/material/material.module';
import { UniversityFormComponent } from './university-form/university-form.component';


@NgModule({
  declarations: [
    UniversityComponent,
    UniversityFormComponent
  ],
  imports: [
    SharedModule,
    PrimeNgModule,
    AllMaterialModule,
    RouterModule.forChild([{path:'',component:UniversityComponent}])
  ]
})
export class UniversityModule { }
