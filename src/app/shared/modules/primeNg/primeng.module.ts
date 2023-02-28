import { HttpClientModule } from '@angular/common/http';
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
import { FileUploadModule } from 'primeng/fileupload';
import {StepsModule} from 'primeng/steps';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {InputSwitchModule} from 'primeng/inputswitch';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {TooltipModule} from 'primeng/tooltip';
import {RadioButtonModule} from 'primeng/radiobutton';


@NgModule({
  declarations: [],
  imports: [
    AvatarGroupModule,
    TooltipModule,
    AvatarModule,
    HttpClientModule,
    StepsModule,
    InputSwitchModule,
    ToggleButtonModule,
    FileUploadModule,
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
    TableModule,
    RadioButtonModule
  ],
  exports: [
    AvatarGroupModule,
    AvatarModule,
    TooltipModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    InputSwitchModule,
    ToggleButtonModule,
    StepsModule,
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
    TableModule,
    FileUploadModule,
    HttpClientModule,
    RadioButtonModule
  ],
  providers:[ConfirmationService,DialogService]
})
export class PrimeNgModule { }
