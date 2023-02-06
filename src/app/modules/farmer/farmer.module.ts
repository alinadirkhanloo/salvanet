import { PrimeNgModule } from 'shared/modules/primeNg/primeng.module';
import { DynamicSelectModule } from 'core/components/dynamics/dynamic-select/dynamic-select.module';
import { NgModule } from '@angular/core';

import { FarmerRoutingModule } from './farmer-routing.module';
import { SharedModule } from 'app/shared/modules/shared.module';


@NgModule({
  declarations: [],
  imports: [
    SharedModule,PrimeNgModule,
    FarmerRoutingModule,DynamicSelectModule
  ]
})
export class FarmerModule { }
