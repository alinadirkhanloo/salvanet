import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PageContainerComponent } from 'app/modules/page-container/page-container.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'base-information'
  },
  {
    path: '', component: PageContainerComponent,
    children:[
      {
        path: 'farmer',
        loadChildren: () => import('modules/farmer/farmer.module')
          .then(m => m.FarmerModule)
      },
      {
        path: 'land-owner',
        loadChildren: () => import('modules/land-owner/land-owner.module')
          .then(m => m.LandOwnerModule)
      },
      {
        path: 'case-history',
        loadChildren: () => import('modules/case-history/case-history.module')
          .then(m => m.CaseHistoryModule)
      },
      {
        path: 'accounts',
        loadChildren: () => import('modules/account/account.module')
          .then(m => m.AccountModule)
      },
      {
        path: 'sim-cards',
        loadChildren: () => import('modules/sim-card/sim-card.module')
          .then(m => m.SimCardModule)
      },
      {
        path: 'persons',
        loadChildren: () => import('modules/person/person.module')
          .then(m => m.PersonModule)
      },
      {
        path: 'divisions-of-the-country',
        loadChildren: () => import('modules/divisions-of-the-country/divisions-of-the-country.module')
          .then(m => m.DivisionsOfTheCountryModule)
      },
      {
        path: 'organization',
        loadChildren: () => import('modules/organization/organization.module')
          .then(m => m.OrganizationModule)
      },
      {
        path: 'organization-positions',
        loadChildren: () =>  import('modules/organization/organization.module')
        .then(m => m.OrganizationModule)
      },
      {
        path: 'company',
        loadChildren: () => import('modules/company/company.module')
          .then(m => m.CompanyModule)
      },
      {
        path: 'jihadi-group',
        loadChildren: () => import('modules/jihadi-group/jihadi-group.module')
          .then(m => m.JihadiGroupModule)
      },
      {
        path: 'persons',
        loadChildren: () => import('modules/person/person.module')
          .then(m => m.PersonModule)
      }
      // {
      //   path: 'teaching',
      //   loadChildren: () => import('modules/teaching/teaching.module')
      //     .then(m => m.TeachingModule)
      // },
      // {
      //   path: 'book',
      //   loadChildren: () => import('modules/book/book.module')
      //     .then(m => m.BookModule)
      // }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageContainerRoutingModule {
}
