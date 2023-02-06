import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/modules/shared.module';
import { NgModule } from '@angular/core';
import { OrganizationComponent } from './organization.component';
import { OrganizationEditComponent } from './organization-edit/organization-edit.component';
import { RegionFormComponent } from './region-form/region-form.component';
import { DynamicTreeModule } from 'app/core/components/dynamics/dynamic-tree/dynamic-tree.module';
import { PositionHistoryComponent } from './position-history/position-history.component';
import { PositionStatusComponent } from './position-status/position-status.component';
import { PositionIncumbentComponent } from './position-incumbent/position-incumbent.component';

const routes: Routes = [
  {
    path: '', component:OrganizationComponent,
  },
  {
    path: 'edit/:id',component:OrganizationEditComponent
  },
  {
    path:'new',component:OrganizationEditComponent
  },
  {
    path: 'region/edit/:id',component:RegionFormComponent
  },
  {
    path:'region/new',component:RegionFormComponent
  },
  {
    path:'position-history',component:PositionHistoryComponent
  },
  {
    path:'position-incumbent',component:PositionIncumbentComponent
  },
  {
    path:'position-status',component:PositionStatusComponent
  }
];

@NgModule({
  declarations: [
    OrganizationComponent,
    OrganizationEditComponent,
    RegionFormComponent,
    PositionHistoryComponent,
    PositionStatusComponent,PositionIncumbentComponent
  ],
  imports: [
    SharedModule,DynamicTreeModule,
    RouterModule.forChild(routes)
  ]
})
export class OrganizationModule { }
