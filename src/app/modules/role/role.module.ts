import { PrimeNgModule } from 'app/shared/modules/primeng/primeng.module';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/modules/shared.module';
import { NgModule } from '@angular/core';
import { RoleComponent } from './role.component';

const routes: Routes = [
  {
    path: '', component:RoleComponent,
  }
];


@NgModule({
  declarations: [
    RoleComponent
  ],
  imports: [
    SharedModule,PrimeNgModule,
    RouterModule.forChild(routes)
  ]
})
export class RoleModule { }
