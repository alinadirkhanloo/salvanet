import { CoursesModule } from './courses/courses.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'education-records',
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaseHistoryRoutingModule { }
