import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EducationRoutingModule } from './education-routing.module';
import { SharedModule } from 'app/shared/modules/shared.module';


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    EducationRoutingModule
  ]
})
export class EducationModule { }
