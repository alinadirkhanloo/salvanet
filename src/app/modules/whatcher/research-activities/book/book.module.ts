import { BookEditComponent } from './book-edit/book-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/modules/shared.module';
import { AllMaterialModule } from 'app/shared/modules/material/material.module';

const routes: Routes = [
  {
    path:'',component:BookEditComponent
  }
];


@NgModule({
  declarations: [
    BookEditComponent
  ],
  imports: [
    AllMaterialModule,
    SharedModule,RouterModule.forChild(routes)
  ]
})
export class BookModule { }
