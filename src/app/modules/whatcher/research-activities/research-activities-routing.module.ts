import { ResearchActivitiesComponent } from './research-activities.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {path:'', component:ResearchActivitiesComponent,
  children:[
  {path:'',pathMatch:'full',redirectTo:'thesises'},
  {
    path: 'books',
    loadChildren: () => import('./book/book.module')
      .then(m => m.BookModule)
  },
  {
    path: 'articles',
    loadChildren: () => import('./article/article.module')
      .then(m => m.ArticleModule)
  },
  {
    path: 'inventions',
    loadChildren: () => import('./invention/invention.module')
      .then(m => m.InventionModule)
  },
  {
    path: 'thesises',
    loadChildren: () => import('./thesis/thesis.module')
      .then(m => m.ThesisModule)
  },
  {
    path: 'teaching-records',
    loadChildren: () => import('./teaching/teaching.module')
      .then(m => m.TeachingModule)
  }
  ]}
  ];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResearchActivitiesRoutingModule { }
