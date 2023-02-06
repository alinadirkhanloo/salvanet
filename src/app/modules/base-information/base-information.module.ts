
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseInformationComponent } from './base-information.component';
import { BaseInformationRoutingModule } from 'modules/base-information/base-information-routing.module';



@NgModule({
  declarations: [
    BaseInformationComponent
  ],
  imports: [
    CommonModule,
    BaseInformationRoutingModule
  ],
  exports: [
    BaseInformationComponent
  ],
})
export class BaseInformationModule { }
