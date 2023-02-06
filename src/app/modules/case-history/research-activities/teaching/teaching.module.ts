import { TeachingEditComponent } from './teaching/teaching-edit.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


import { TeachingComponent } from './teaching.component';
import { SharedModule } from 'app/shared/modules/shared.module';


const routes: Routes = [
  {
    path: '', component:TeachingComponent,
  },
  {
    path: 'edit/:id',component:TeachingEditComponent
  },
  {
    path:'new',component:TeachingEditComponent
  }
];


@NgModule({
  declarations: [
    TeachingComponent,TeachingEditComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class TeachingModule { }
