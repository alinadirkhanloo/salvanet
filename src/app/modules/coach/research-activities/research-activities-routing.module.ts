import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'book',
    loadChildren: () => import('./book/book.module')
      .then(m => m.BookModule)
  },
  {
    path: 'article',
    loadChildren: () => import('./article/article.module')
      .then(m => m.ArticleModule)
  },
  {
    path: 'invention',
    loadChildren: () => import('./invention/invention.module')
      .then(m => m.InventionModule)
  },
  {
    path: 'thesis',
    loadChildren: () => import('./thesis/thesis.module')
      .then(m => m.ThesisModule)
  },
  {
    path: 'teaching',
    loadChildren: () => import('./teaching/teaching.module')
      .then(m => m.TeachingModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResearchActivitiesRoutingModule { }
