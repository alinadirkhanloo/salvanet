import { CompanyComponent } from './company.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/modules/shared.module';
import { PrimeNgModule } from 'app/shared/modules/primeng/primeng.module';
import { AllMaterialModule } from 'app/shared/modules/material/material.module';



@NgModule({
  declarations: [
    CompanyComponent
  ],
  imports: [
    SharedModule,
    PrimeNgModule,
    AllMaterialModule,
    RouterModule.forChild([{path:'',component:CompanyComponent}])
  ]
})
export class CompanyModule { }
