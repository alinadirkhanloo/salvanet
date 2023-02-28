import { NgModule } from '@angular/core';

import { PersonnelComponent } from './personnel.component';
import { SharedModule } from 'app/shared/modules/shared.module';
import { FindBoxModule } from 'app/core/components/find-box/find-box.module';
import { AllMaterialModule } from 'app/shared/modules/material/material.module';
import { RouterModule, Routes } from '@angular/router';
import { PersonnelFormComponent } from './personnel-form/personnel-form.component';


const routes: Routes = [
  {
    path: '', component:PersonnelComponent,
  },
  {
    path: 'edit/:id',component:PersonnelFormComponent
  },
  {
    path:'new',component:PersonnelFormComponent
  }
];
@NgModule({
  declarations: [
    PersonnelComponent,
    PersonnelFormComponent
  ],
  imports: [
    SharedModule,FindBoxModule,AllMaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class PersonnelModule { }
