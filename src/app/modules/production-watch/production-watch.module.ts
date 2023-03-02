import { DynamicSelectModule } from 'app/core/components/dynamics/dynamic-select/dynamic-select.module';
import { NgModule } from '@angular/core';

import { ProductionWatchRoutingModule } from './production-watch-routing.module';
import { ProductionWatchComponent } from './production-watch.component';
import { SharedModule } from 'app/shared/modules/shared.module';
import { PrimeNgModule } from 'app/shared/modules/primeng/primeng.module';


@NgModule({
  declarations: [
    ProductionWatchComponent
  ],
  imports: [
    SharedModule,PrimeNgModule,
    DynamicSelectModule,
    ProductionWatchRoutingModule
  ]
})
export class ProductionWatchModule { }
