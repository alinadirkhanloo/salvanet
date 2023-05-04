import { NgModule } from '@angular/core';

import { DynamicNavbarMenuComponent } from './dynamic-navbar-menu.component';
import { PrimeNgModule } from 'app/shared/modules/primeng/primeng.module';
import { SharedModule } from 'app/shared/modules/shared.module';



@NgModule({
  declarations: [
    DynamicNavbarMenuComponent
  ],
  imports: [
    SharedModule,PrimeNgModule
  ],
  exports:[DynamicNavbarMenuComponent]
})
export class DynamicNavbarMenuModule { }
