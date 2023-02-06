import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { CoursesEditComponent } from './courses-edit/courses-edit.component';
import { SharedModule } from 'app/shared/modules/shared.module';

const routes: Routes = [
  {
    path: '', component:CoursesComponent,
  },
  {
    path: 'edit/:id',component:CoursesEditComponent
  },
  {
    path:'new',component:CoursesEditComponent
  }
];


@NgModule({
  declarations: [
    CoursesComponent,
    CoursesEditComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class CoursesModule { }
