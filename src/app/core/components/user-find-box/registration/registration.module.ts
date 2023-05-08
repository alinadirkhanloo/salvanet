
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/modules/shared.module';
import { AllMaterialModule } from 'app/shared/modules/material/material.module';
import { FindBoxModule } from 'app/core/components/find-box/find-box.module';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegistrationComponent } from './registration.component';
@NgModule({
    declarations: [
        RegistrationComponent
     ],
    imports: [
        SharedModule,AllMaterialModule,FindBoxModule,NgbModule
    ],
    providers: []
})
export class AccountModule { }
