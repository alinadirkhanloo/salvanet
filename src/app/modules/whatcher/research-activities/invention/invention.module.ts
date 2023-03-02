import { SharedModule } from 'app/shared/modules/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { InventionEditComponent } from './invention-edit/invention-edit.component';

const routes: Routes = [
  {
    path:'',component:InventionEditComponent
  }
];

@NgModule({
  declarations: [
    InventionEditComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class InventionModule { }
