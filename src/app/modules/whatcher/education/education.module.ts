import { NgModule } from '@angular/core';

import { EducationRoutingModule } from './education-routing.module';
import { SharedModule } from 'app/shared/modules/shared.module';
import { EducationalRecordsEditComponent } from './educational-records-edit.component';
import { DynamicSelectModule } from 'app/core/components/dynamics/dynamic-select/dynamic-select.module';


@NgModule({
  declarations: [EducationalRecordsEditComponent],
  imports: [
    SharedModule,DynamicSelectModule,
    EducationRoutingModule
  ]
})
export class EducationModule { }
