import { SharedModule } from 'app/shared/modules/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CountryComponent } from './country.component';
import { CountryEditComponent } from './country-edit/country-edit.component';

const routes: Routes = [
  {
    path: '', component:CountryComponent,
  },
  {
    path: 'edit/:id',component:CountryEditComponent
  },
  {
    path:'new',component:CountryEditComponent
  }
];


@NgModule({
  declarations: [
    CountryComponent,
    CountryEditComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class CountryModule { }
