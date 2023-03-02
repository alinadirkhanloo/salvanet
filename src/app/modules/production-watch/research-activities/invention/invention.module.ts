import { SharedModule } from 'app/shared/modules/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventionComponent } from './invention.component';
import { InventionEditComponent } from './invention-edit/invention-edit.component';

const routes: Routes = [
  {
    path:'',component:InventionEditComponent
  },
  {
    path: 'grid', component:InventionComponent,
  },
  {
    path: 'edit/:id',component:InventionEditComponent
  },
  {
    path:'new',component:InventionEditComponent
  }
];

@NgModule({
  declarations: [
    InventionComponent,
    InventionEditComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class InventionModule { }
