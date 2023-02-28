import { NgModule } from '@angular/core';

import { DynamicNavbarMenuComponent } from './dynamic-navbar-menu.component';
import { RahianSharedModule } from 'app/shared/modules/rahian/shared.module';
import { PrimeNgModule } from 'app/shared/modules/primeng/primeng.module';



@NgModule({
  declarations: [
    DynamicNavbarMenuComponent
  ],
  imports: [
    RahianSharedModule,PrimeNgModule
  ],
  exports:[DynamicNavbarMenuComponent]
})
export class DynamicNavbarMenuModule { }
