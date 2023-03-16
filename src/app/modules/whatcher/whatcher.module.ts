import { DynamicSelectModule } from 'app/core/components/dynamics/dynamic-select/dynamic-select.module';
import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/modules/shared.module';
import { PrimeNgModule } from 'app/shared/modules/primeng/primeng.module';
import { WhatcherRoutingModule } from './whatcher-routing.module';
import { WhatcherComponent } from './whatcher.component';
import { ConfermationComponent } from './confermation/confermation.component';

@NgModule({
  declarations: [
    WhatcherComponent,
    ConfermationComponent
  ],
  imports: [
    SharedModule,PrimeNgModule,
    DynamicSelectModule,
    WhatcherRoutingModule
  ]
})
export class WhatcherModule { }
