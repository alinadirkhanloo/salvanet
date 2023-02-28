import { SharedModule } from 'app/shared/modules/shared.module';
import { NgModule } from '@angular/core';
import { PersonComponent } from './person.component';
import { PersonEditComponent } from './person-edit/person-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { FindBoxModule } from 'app/core/components/find-box/find-box.module';
import { AllMaterialModule } from 'app/shared/modules/material/material.module';

const routes: Routes = [
  {
    path: '', component:PersonComponent,
  },
  {
    path: 'edit/:id',component:PersonEditComponent
  },
  {
    path:'new',component:PersonEditComponent
  }
];

@NgModule({
  declarations: [
    PersonComponent,
    PersonEditComponent
  ],
  imports: [
    SharedModule,FindBoxModule,AllMaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class PersonModule { }
