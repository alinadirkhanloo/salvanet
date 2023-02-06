import { OwnersEditComponent } from './owners-edit/owners-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { OwnersComponent } from './owners.component';
import { SharedModule } from 'app/shared/modules/shared.module';

const routes: Routes = [
  {
    path: '', component:OwnersComponent,
  },
  {
    path: 'edit/:id',component:OwnersEditComponent
  },
  {
    path:'new',component:OwnersEditComponent
  }
];

@NgModule({
  declarations: [
    OwnersComponent,OwnersEditComponent
  ],
  imports: [
    SharedModule,RouterModule.forChild(routes)
  ]
})
export class OwnersModule { }
