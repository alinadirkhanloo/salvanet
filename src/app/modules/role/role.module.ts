import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/modules/shared.module';
import { NgModule } from '@angular/core';
import { RoleComponent } from './role.component';
import { RoleEditComponent } from './role-edit/role-edit.component';

const routes: Routes = [
  {
    path: '', component:RoleComponent,
  },
  {
    path: 'edit/:id',component:RoleEditComponent
  },
  {
    path:'new',component:RoleEditComponent
  }
];


@NgModule({
  declarations: [
    RoleComponent,
    RoleEditComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ServerModule { }
