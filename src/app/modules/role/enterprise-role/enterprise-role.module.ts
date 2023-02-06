import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnterpriseRoleComponent } from './enterprise-role.component';
import { EnterpriseRoleEditComponent } from './enterprise-role-edit/enterprise-role-edit.component';

const routes: Routes = [
  {
    path: '', component:EnterpriseRoleComponent,
  },
  {
    path: 'edit/:id',component:EnterpriseRoleEditComponent
  },
  {
    path:'new',component:EnterpriseRoleEditComponent
  }
];

@NgModule({
  declarations: [
    EnterpriseRoleComponent,
    EnterpriseRoleEditComponent
  ],
  imports: [
    CommonModule
  ]
})
export class EnterpriseRoleModule { }
