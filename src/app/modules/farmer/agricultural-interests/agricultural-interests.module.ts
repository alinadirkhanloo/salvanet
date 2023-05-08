import { NgModule } from '@angular/core';
import { AgriculturalInterestsComponent } from './agricultural-interests.component';
import { SharedModule } from 'app/shared/modules/shared.module';
import { RouterModule } from '@angular/router';
import { DynamicSelectModule } from 'core/components/dynamics/dynamic-select/dynamic-select.module';
import {PrimeNgModule} from 'shared/modules/primeng/primeng.module';



@NgModule({
  declarations: [
    AgriculturalInterestsComponent
  ],
  imports: [
    PrimeNgModule,
    DynamicSelectModule,
    SharedModule,RouterModule.forChild([{path:'',component:AgriculturalInterestsComponent}])
  ]
})
export class AgriculturalInterestsModule { }
