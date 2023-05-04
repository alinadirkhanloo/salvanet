import { NgModule } from '@angular/core';
import { CoachingCondidatesComponent } from './coaching-condidates.component';
import { SharedModule } from 'app/shared/modules/shared.module';
import { PrimeNgModule } from 'app/shared/modules/primeng/primeng.module';
import { AllMaterialModule } from 'app/shared/modules/material/material.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CoachingCondidatesComponent
  ],
  imports: [
    SharedModule,
    PrimeNgModule,
    AllMaterialModule,
    RouterModule.forChild([{path:'',component:CoachingCondidatesComponent}])
  ]
})
export class CoachingCondidatesModule { }
