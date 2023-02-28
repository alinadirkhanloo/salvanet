import { NgModule } from '@angular/core';
import { PersonnelFilterComponent } from './personnel-filter.component';
import { SharedModule } from 'app/shared/modules/shared.module';
import { DynamicSelectModule } from '../dynamics/dynamic-select/dynamic-select.module';
import { PrimeNgModule } from 'app/shared/modules/primeng/primeng.module';
import { DatePickerModule } from '../dynamics/date-picker/date-picker.module';
import { AllMaterialModule } from 'app/shared/modules/material/material.module';



@NgModule({
  declarations: [
    PersonnelFilterComponent
  ],
  imports: [
    SharedModule, DynamicSelectModule, DatePickerModule,AllMaterialModule
  ],
  exports:[PersonnelFilterComponent]
})
export class PersonnelFilterModule { }
