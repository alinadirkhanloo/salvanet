import { SharedModule } from 'app/shared/modules/shared.module';
import { NgModule } from '@angular/core';
import { PersonComponent } from './person.component';
import { PersonEditComponent } from './person-edit/person-edit.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', component:PersonComponent,
  },
  {
    path: 'edit/:id',component:PersonEditComponent
  },
  {
    path:'new',component:PersonEditComponent
  },
  {
    path: 'natural-persons',
    loadChildren: () => import('./natural-persons/natural-persons.module')
      .then(m => m.NaturalPersonsModule)
  },
  {
    path: 'legal-persons',
    loadChildren: () => import('./legal-persons/legal-persons.module')
      .then(m => m.LegalPersonsModule)
  },
];

@NgModule({
  declarations: [
    PersonComponent,
    PersonEditComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class PersonModule { }
