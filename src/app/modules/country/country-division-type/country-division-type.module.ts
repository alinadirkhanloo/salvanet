import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/modules/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryDivisionTypeComponent } from './country-division-type.component';
import { CountryDivisionTypeEditComponent } from './country-division-type-edit/country-division-type-edit.component';

const routes: Routes = [
  {
    path: '', component:CountryDivisionTypeComponent,
  },
  {
    path: 'edit/:id',component:CountryDivisionTypeEditComponent
  },
  {
    path:'new',component:CountryDivisionTypeEditComponent
  }
];

@NgModule({
  declarations: [
    CountryDivisionTypeComponent,
    CountryDivisionTypeEditComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class CountryDivisionTypeModule { }
