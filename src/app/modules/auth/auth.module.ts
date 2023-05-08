import { OnlyEnglishModule } from './../../shared/directives/only-english.directive';
import { SignupTypeDialogComponent } from './signup-type-dialog/signup-type-dialog.component';

import { UserAuthComponent } from './user-auth/user-auth.component';
import { LoginComponent } from './login/login.component';
import { UserVerificationComponent } from './user-verification/user-verification.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/modules/shared.module';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { RegistrationComponent } from './registration/registration.component';
import { CompanyRegistrationComponent } from './company-registration/company-registration.component';
import { UserActivationComponent } from './user-activation/user-activation.component';
import { AllMaterialModule } from 'app/shared/modules/material/material.module';
import { PrimeNgModule } from 'shared/modules/primeng/primeng.module';
import { FindBoxModule } from 'app/core/components/find-box/find-box.module';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PersonnelFilterModule } from 'app/core/components/personnel-filter/personnel-filter.module';
import { RolesService } from 'app/shared/services/role.service';


const routes: Routes = [
    {
        path: '', redirectTo: 'login',pathMatch:'full'
    }
    , {
        path: 'login', component: LoginComponent
    }
    , {
        path: 'user-authentication', component: UserAuthComponent
    }
    , {
        path: 'user-verification', component: UserVerificationComponent
    },
    {
        path: 'user-activation', component: UserActivationComponent
    },
    {
        path: 'user-registration', component: RegistrationComponent
    },
    {
        path: 'change-password', component: ChangePassComponent
    },
    {
        path: 'company-registration', component: CompanyRegistrationComponent
    }
];


@NgModule({
    declarations: [
        LoginComponent,
        UserAuthComponent,
        UserVerificationComponent
        ,ChangePassComponent
        ,RegistrationComponent
    ,SignupTypeDialogComponent, CompanyRegistrationComponent, UserActivationComponent],
    imports: [
        SharedModule,AllMaterialModule,FindBoxModule,
        RouterModule.forChild(routes),NgbModule,PersonnelFilterModule

    ],
    providers: []
})
export class AccountModule { }
