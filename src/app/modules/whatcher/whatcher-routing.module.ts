import { ConfermationComponent } from './confermation/confermation.component';
import { WhatcherComponent } from './whatcher.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: WhatcherComponent,
    children: [

      { path: '', pathMatch: 'full', redirectTo: 'education-records' },

      {
        path: 'education-records',
        loadChildren: () => import('./education/education.module')
          .then(m => m.EducationModule),
      },
      {
        path: 'job-records',
        loadChildren: () => import('./job/job.module')
          .then(m => m.JobModule)
      },
      {
        path: 'research-activities',
        loadChildren: () => import('./research-activities/research-activities.module')
          .then(m => m.ResearchActivitiesModule)
      },
      {
        path: 'courses',
        loadChildren: () => import('./courses/courses.module')
          .then(m => m.CoursesModule)
      },
      {
        path: 'social-skills',
        loadChildren: () => import('./social-skills/social-skills.module')
          .then(m => m.SocialSkillsModule)
      },
      {
        path: 'software-skills',
        loadChildren: () => import('./software-skills/software-skills.module')
          .then(m => m.SoftwareSkillsModule)
      },
      {
        path: 'membership',
        loadChildren: () => import('./membership/membership.module')
          .then(m => m.MembershipModule)
      },
      {
        path: 'confirmation',component:ConfermationComponent
      }
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WhatcherRoutingModule { }
