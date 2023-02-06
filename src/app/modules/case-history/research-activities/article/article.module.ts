import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ArticleComponent } from './article.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { SharedModule } from 'app/shared/modules/shared.module';

const routes: Routes = [
  {
    path: '', component:ArticleComponent,
  },
  {
    path: 'edit/:id',component:ArticleEditComponent
  },
  {
    path:'new',component:ArticleEditComponent
  }
];


@NgModule({
  declarations: [
    ArticleComponent,
    ArticleEditComponent
  ],
  imports: [
    SharedModule, RouterModule.forChild(routes)
  ]
})
export class ArticleModule { }
