import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LandsComponent } from './lands.component';
import { AllMaterialModule } from 'app/shared/modules/material/material.module';
import { PrimeNgModule } from 'app/shared/modules/primeng/primeng.module';
import { SharedModule } from 'app/shared/modules/shared.module';



@NgModule({
  declarations: [
    LandsComponent
  ],
  imports: [
      SharedModule,
      PrimeNgModule,
      AllMaterialModule,RouterModule.forChild([{path:'',component:LandsComponent}])
  ]
})
export class LandsModule { }
