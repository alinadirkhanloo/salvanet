import { NgModule } from '@angular/core';

import { CaseHistoryRoutingModule } from './case-history-routing.module';
import { SharedModule } from 'app/shared/modules/shared.module';


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    CaseHistoryRoutingModule
  ]
})
export class CaseHistoryModule { }
