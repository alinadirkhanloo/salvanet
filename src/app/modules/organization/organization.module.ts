import { FindBoxModule } from 'app/core/components/find-box/find-box.module';
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
import { PositionComponent } from './positions/position.component';
import { PersonnelFilterModule } from 'app/core/components/personnel-filter/personnel-filter.module';
import { PersonModule } from 'app/core/components/user-find-box/person/person.module';

const routes: Routes = [
  {
    path: '', component:OrganizationComponent
  },
  {
    path: 'memberships',
    loadChildren: () => import('modules/membership/membership.module')
      .then(m => m.MembershipModule)
  },
  {
    path: 'region/edit/:id',component:RegionFormComponent
  },
  {
    path:'region/new',component:RegionFormComponent
  },
  {
    path:'positions/:id',component:PositionComponent
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
    PositionStatusComponent,PositionIncumbentComponent,PositionComponent
  ],
  imports: [
    SharedModule,DynamicTreeModule,FindBoxModule,PersonModule,
    RouterModule.forChild(routes)
  ]
})
export class OrganizationModule { }
