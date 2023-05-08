import { SharedModule } from 'app/shared/modules/shared.module';
import { NgModule } from '@angular/core';
import { PersonComponent } from './person.component';
import { FindBoxModule } from 'app/core/components/find-box/find-box.module';
import { AllMaterialModule } from 'app/shared/modules/material/material.module';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    PersonComponent
  ],
  imports: [
    SharedModule,FindBoxModule,AllMaterialModule,NgbModule
  ],
  
  exports:[PersonComponent]
})
export class PersonModule { }
