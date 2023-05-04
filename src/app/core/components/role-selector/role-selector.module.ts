import { NgModule } from '@angular/core';
import { RoleSelectorComponent } from './role-selector.component';
import { SharedModule } from 'app/shared/modules/shared.module';



@NgModule({
  declarations: [
    RoleSelectorComponent
  ],
  imports: [
    SharedModule
  ],
  exports:[RoleSelectorComponent]
})
export class RoleSelectorModule { }
