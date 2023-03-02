import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/modules/shared.module';
import { NgModule } from '@angular/core';
import { ThesisEditComponent } from './thesis-edit/thesis-edit.component';


const routes: Routes = [
  {
    path:'',component:ThesisEditComponent
  }
];


@NgModule({
  declarations: [
    ThesisEditComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ThesisModule { }
