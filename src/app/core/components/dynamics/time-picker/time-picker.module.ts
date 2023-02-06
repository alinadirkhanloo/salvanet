import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimePickerComponent } from './time-picker.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { FormsModule } from '@angular/forms';
import { AbpSharedModule } from 'app/shared/modules/abp/shared-abp.module';



@NgModule({
  declarations: [
    TimePickerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,AbpSharedModule,
    NgxMaterialTimepickerModule
  ],
  exports:[TimePickerComponent]
})
export class TimePickerModule { }
