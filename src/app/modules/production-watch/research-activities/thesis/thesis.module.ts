import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/modules/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThesisComponent } from './thesis.component';
import { ThesisEditComponent } from './thesis-edit/thesis-edit.component';


const routes: Routes = [
  {
    path: '', component:ThesisComponent,
  },
  {
    path: 'edit/:id',component:ThesisEditComponent
  },
  {
    path:'new',component:ThesisEditComponent
  }
];


@NgModule({
  declarations: [
    ThesisComponent,
    ThesisEditComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ThesisModule { }
