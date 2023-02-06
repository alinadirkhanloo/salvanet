import { DynamicSelectModule } from 'core/components/dynamics/dynamic-select/dynamic-select.module';
import { NgModule } from '@angular/core';
import { AgriculturalExperiencesComponent } from './agricultural-experiences.component';
import { SharedModule } from 'app/shared/modules/shared.module';
import { RouterModule } from '@angular/router';
import { PrimeNgModule } from 'app/shared/modules/primeng/primeng.module';



@NgModule({
  declarations: [
    AgriculturalExperiencesComponent
  ],
  imports: [
    PrimeNgModule,
    DynamicSelectModule,
    SharedModule,RouterModule.forChild([{path:'',component:AgriculturalExperiencesComponent}])
  ]
})
export class AgriculturalExperiencesModule { }
