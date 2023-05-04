import { HttpClientModule } from '@angular/common/http';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';

import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
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
import {TabViewModule} from 'primeng/tabview';

import {PanelModule} from 'primeng/panel';
import {TabMenuModule} from 'primeng/tabmenu';

@NgModule({
  declarations: [],
  imports: [
    PanelModule,
    AvatarGroupModule,
    TabViewModule,
    TooltipModule,
    AvatarModule,
    HttpClientModule,
    StepsModule,
    InputSwitchModule,
    ToggleButtonModule,
    FileUploadModule,MenuModule,MenubarModule,
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
    RadioButtonModule,
    TabMenuModule
  ],
  exports: [
    PanelModule,
    AvatarGroupModule,
    AvatarModule,
    TabViewModule,
    TooltipModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    InputSwitchModule,
    ToggleButtonModule,
    StepsModule,
    ConfirmPopupModule,
    InputTextModule,MenuModule,MenubarModule,
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
    RadioButtonModule,
    TabMenuModule
  ],
  providers:[ConfirmationService,DialogService]
})
export class PrimeNgModule { }
