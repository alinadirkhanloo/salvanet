import { NgModule } from '@angular/core';
import { DatePickerComponent } from './date-picker.component';
import { MaterialModule } from 'app/shared/modules/material/material.module';
import { RahianSharedModule } from 'app/shared/modules/rahian/shared.module';



@NgModule({
  declarations: [
    DatePickerComponent
  ],
  imports: [
    RahianSharedModule,MaterialModule
  ],
  exports:[DatePickerComponent]
})
export class DatePickerModule { }
