import { SharedModule } from 'app/shared/modules/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CompanyComponent } from './company.component';
import { CompanyEditComponent } from './company-edit/company-edit.component';
import { RegionFormComponent } from './region-form/region-form.component';
import { PositionHistoryComponent } from './position-history/position-history.component';

const routes: Routes = [
  {
    path: '', component:CompanyComponent,
  },
  {
    path: 'edit/:id',component:CompanyEditComponent
  },
  {
    path:'new',component:CompanyEditComponent
  },
  {
    path: 'region/edit/:id',component:RegionFormComponent
  },
  {
    path:'region/new',component:RegionFormComponent
  },
  {
    path:'position-history',component:PositionHistoryComponent
  }
];

@NgModule({
  declarations: [
    CompanyComponent,
    CompanyEditComponent,
    RegionFormComponent,
    PositionHistoryComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class CompanyModule { }
