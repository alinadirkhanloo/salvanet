import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';
import {CardModule} from 'primeng/card';
import { NgModule } from '@angular/core';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ConfirmationService} from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { DynamicDialogModule, DialogService } from 'primeng/dynamicdialog';
@NgModule({
  declarations: [],
  imports: [
    DynamicDialogModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    InputTextModule,
    ProgressBarModule,
    DropdownModule,
    CardModule,
    ButtonModule,
    DialogModule,
    ContextMenuModule,
    MultiSelectModule,
    SliderModule,
    CalendarModule,
    ToastModule,
    TableModule
  ],
  exports: [
    DynamicDialogModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    InputTextModule,
    ProgressBarModule,
    DropdownModule,
    CardModule,
    ButtonModule,
    DialogModule,
    ContextMenuModule,
    MultiSelectModule,
    SliderModule,
    CalendarModule,
    ToastModule,
    TableModule
  ],
  providers:[ConfirmationService,DialogService]
})
export class PrimeNgModule { }
