
import { PrimeNgModule } from 'app/shared/modules/primeng/primeng.module';
import { DynamicSelectModule } from 'core/components/dynamics/dynamic-select/dynamic-select.module';
import { NgModule } from '@angular/core';

import { FarmerRoutingModule } from './farmer-routing.module';
import { SharedModule } from 'app/shared/modules/shared.module';
import { FarmerComponent } from './farmer.component';


@NgModule({
  declarations: [
    FarmerComponent
  ],
  imports: [
    SharedModule,PrimeNgModule,
    FarmerRoutingModule,DynamicSelectModule
  ]
})
export class FarmerModule { }
