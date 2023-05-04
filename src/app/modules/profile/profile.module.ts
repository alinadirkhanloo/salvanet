import { DynamicNavbarMenuModule } from 'core/components/dynamics/dynamic-navbar-menu/dynamic-navbar-menu.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { SharedModule } from 'app/shared/modules/shared.module';
import { PrimeNgModule } from 'app/shared/modules/primeng/primeng.module';


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    SharedModule,PrimeNgModule,DynamicNavbarMenuModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
