import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
      path: 'agricultural-interests',
      loadChildren: () => import('./agricultural-interests/agricultural-interests.module')
        .then(m => m.AgriculturalInterestsModule)
    },
    {
      path: 'agricultural-experiences',
      loadChildren: () => import('./agricultural-experiences/agricultural-experiences.module')
        .then(m => m.AgriculturalExperiencesModule)
    },
    {
      path: 'interests-workplace',
      loadChildren: () => import('./interests-workplace/interests-workplace.module')
        .then(m => m.InterestsWorkplaceModule)
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FarmerRoutingModule { }
