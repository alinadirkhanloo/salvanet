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
        path: 'base-information',
        loadChildren: () => import('modules/base-information/base-information.module')
          .then(m => m.BaseInformationModule)
      },
      {
        path: 'farmer',
        loadChildren: () => import('modules/farmer/farmer.module')
          .then(m => m.FarmerModule)
      },
      {
        path: 'company',
        loadChildren: () => import('app/modules/people/company/company.module')
          .then(m => m.CompanyModule)
      },
      {
        path: 'person',
        loadChildren: () => import('app/modules/people/person/person.module')
          .then(m => m.PersonModule)
      },
      {
        path: 'users',
        loadChildren: () => import('modules/account/account.module')
          .then(m => m.AccountModule)
      },
      {
        path: 'role-determination',
        loadChildren: () => import('modules/role/role.module')
          .then(m => m.ServerModule)
      },
      {
        path: 'organization',
        loadChildren: () => import('modules/organization/organization.module')
          .then(m => m.OrganizationModule)
      },
      {
        path: 'registration-announcemen',
        loadChildren: () => import('app/modules/registration-announcement/registration-announcement.module')
          .then(m => m.RegistrationAnnouncementModule)
      },

      {
        path: 'courses',
        loadChildren: () => import('modules/cources/cources.module')
          .then(m => m.CourcesModule)
      },


      {
        path: 'land-owner',
        loadChildren: () => import('modules/land-owner/land-owner.module')
          .then(m => m.LandOwnerModule)
      },
      {
        path: 'coach',
        loadChildren: () => import('modules/coach/coach.module')
          .then(m => m.CoachModule)
      },
      {
        path: 'food-security-watch',
        loadChildren: () => import('modules/food-security-watch/food-security-watch.module')
          .then(m => m.FoodSecurityWatchModule)
      },
      {
        path: 'production-watch',
        loadChildren: () => import('modules/production-watch/production-watch.module')
          .then(m => m.ProductionWatchModule)
      },

      {
        path: 'sim-cards',
        loadChildren: () => import('modules/sim-card/sim-card.module')
          .then(m => m.SimCardModule)
      },
      {
        path: 'divisions-of-the-country',
        loadChildren: () => import('modules/divisions-of-the-country/divisions-of-the-country.module')
          .then(m => m.DivisionsOfTheCountryModule)
      },

      {
        path: 'organization-positions',
        loadChildren: () =>  import('modules/organization/organization.module')
        .then(m => m.OrganizationModule)
      },
      {
        path: 'company',
        loadChildren: () => import('app/modules/people/company/company.module')
          .then(m => m.CompanyModule)
      },
      {
        path: 'jihadi-group',
        loadChildren: () => import('modules/jihadi-group/jihadi-group.module')
          .then(m => m.JihadiGroupModule)
      },
      {
        path: 'registration-announcement',
        loadChildren: () => import('modules/registration-announcement/registration-announcement.module')
          .then(m => m.RegistrationAnnouncementModule)
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageContainerRoutingModule {
}
