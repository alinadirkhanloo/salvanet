import { AllMaterialModule } from '../../../../shared/modules/material/material.module';
import { NgModule } from '@angular/core';
import { DatePickerComponent } from './date-picker.component';
import { SharedModule } from 'app/shared/modules/shared.module';



@NgModule({
  declarations: [
    DatePickerComponent
  ],
  imports: [
    SharedModule,AllMaterialModule
  ],
  exports:[DatePickerComponent]
})
export class DatePickerModule { }
