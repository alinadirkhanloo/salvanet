import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { SharedModule } from 'app/shared/modules/shared.module';
import { AllMaterialModule } from 'app/shared/modules/material/material.module';

const routes: Routes = [
  {
    path:'',component:ArticleEditComponent
  }
];


@NgModule({
  declarations: [
    ArticleEditComponent
  ],
  imports: [
    AllMaterialModule,
    SharedModule, RouterModule.forChild(routes)
  ]
})
export class ArticleModule { }
