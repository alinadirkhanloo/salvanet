import { BookEditComponent } from './book-edit/book-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BookComponent } from './book.component';
import { SharedModule } from 'app/shared/modules/shared.module';

const routes: Routes = [
  {
    path: '', component:BookComponent,
  },
  {
    path: 'edit/:id',component:BookEditComponent
  },
  {
    path:'new',component:BookEditComponent
  }
];


@NgModule({
  declarations: [
    BookComponent,BookEditComponent
  ],
  imports: [
    SharedModule,RouterModule.forChild(routes)
  ]
})
export class BookModule { }
