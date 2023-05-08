import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/modules/shared.module';
import { AllMaterialModule } from 'app/shared/modules/material/material.module';
import { PrimeNgModule } from 'app/shared/modules/primeng/primeng.module';
import { FindBoxModule } from 'app/core/components/find-box/find-box.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PersonnelFilterModule } from 'app/core/components/personnel-filter/personnel-filter.module';
import { UserAuthComponent } from './user-auth.component';




@NgModule({
  declarations: [UserAuthComponent],
  imports: [
    SharedModule,AllMaterialModule,PrimeNgModule,FindBoxModule,NgbModule,PersonnelFilterModule
  ],
  exports:[UserAuthComponent]
})
export class UserAuthModule { }
