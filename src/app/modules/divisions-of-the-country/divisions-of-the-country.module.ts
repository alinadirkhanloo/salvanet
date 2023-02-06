import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/modules/shared.module';
import { NgModule } from '@angular/core';
import { DivisionsOfTheCountryComponent } from './divisions-of-the-country.component';
import { DivisionsOfTheCountryFormComponent } from './divisions-of-the-country-form/divisions-of-the-country-form.component';
import { DynamicTreeModule } from 'app/core/components/dynamics/dynamic-tree/dynamic-tree.module';
import { CountryDevisionUploaderComponent } from './country-devision-uploader/country-devision-uploader.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'tree'
  },
  {
    path: 'tree', component: DivisionsOfTheCountryComponent,
  },
  {
    path: 'edit', component: DivisionsOfTheCountryFormComponent
  },
  {
    path: 'new', component: DivisionsOfTheCountryFormComponent
  },
  {
    path: 'upload', component: CountryDevisionUploaderComponent
  }
];

@NgModule({
  declarations: [
    DivisionsOfTheCountryComponent,
    DivisionsOfTheCountryFormComponent,
    CountryDevisionUploaderComponent
  ],
  imports: [
    SharedModule,DynamicTreeModule,
    RouterModule.forChild(routes)
  ]
})
export class DivisionsOfTheCountryModule { }
