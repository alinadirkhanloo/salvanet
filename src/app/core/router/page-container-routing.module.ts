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
        path: 'farmer-registration',
        loadChildren: () => import('modules/farmer/farmer.module')
          .then(m => m.FarmerModule)
      },
      {
        path: 'companeis',
        loadChildren: () => import('app/modules/people/company/company.module')
          .then(m => m.CompanyModule)
      },
      {
        path: 'persons',
        loadChildren: () => import('app/modules/people/person/person.module')
          .then(m => m.PersonModule)
      },
      {
        path: 'personnel',
        loadChildren: () => import('app/modules/personnel/personnel.module')
          .then(m => m.PersonnelModule)
      },
      {
        path: 'users',
        loadChildren: () => import('modules/account/account.module')
          .then(m => m.AccountModule)
      },
      {
        path: 'role-determination',
        loadChildren: () => import('modules/role/role.module')
          .then(m => m.RoleModule)
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
        path: 'coach-registration',loadChildren: () =>  import('app/modules/whatcher/whatcher.module')
        .then(m => m.WhatcherModule)
      },
      {
        path: 'food-security-watch-registration',loadChildren: () => import('app/modules/whatcher/whatcher.module')
        .then(m => m.WhatcherModule)
      },
      {
        path: 'production-watch-registration',
        loadChildren: () =>  import('app/modules/whatcher/whatcher.module')
        .then(m => m.WhatcherModule)
      },
      {
        path: 'product-owner-registration',
        loadChildren: () =>  import('app/modules/whatcher/whatcher.module')
        .then(m => m.WhatcherModule)
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
