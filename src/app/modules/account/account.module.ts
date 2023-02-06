
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AccountActivationComponent } from './account-activation/account-activation.component';
import { AccountEditComponent } from './account-edit/account-edit.component';
import { AccountNewComponent } from './account-new/account-new.component';
import { AccountComponent } from './account.component';
import { SharedModule } from 'app/shared/modules/shared.module';
import { AccountFormComponent } from './account-form/account-form.component';

const routes: Routes = [
  {
    path: '', component:AccountComponent,
  },
  {
    path: 'edit/:id',component:AccountEditComponent
  },
  {
    path: 'activation',component:AccountActivationComponent
  }
];


@NgModule({
  declarations:[
    AccountComponent,
    AccountEditComponent,
    AccountActivationComponent,
    AccountNewComponent,
    AccountFormComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class AccountModule { }
