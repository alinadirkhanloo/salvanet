import { NgModule } from '@angular/core';
import { RoleSelectorComponent } from './role-selector.component';
import { SharedModule } from 'app/shared/modules/shared.module';

import { ListboxModule } from 'primeng/listbox';


@NgModule({
  declarations: [
    RoleSelectorComponent
  ],
  imports: [
    SharedModule,ListboxModule
  ],
  exports:[RoleSelectorComponent]
})
export class RoleSelectorModule { }
