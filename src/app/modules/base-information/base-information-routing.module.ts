import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'product',loadChildren:()=>import('./product/product.module').then(m=>m.ProductModule)},
  {path:'product-classification',loadChildren:()=>import('./product-classification/product-classification.module').then(m=>m.ProductClassificationModule)},
  {path:'university',loadChildren:()=>import('./university/university.module').then(m=>m.UniversityModule)},
  {path:'study-filed',loadChildren:()=>import('./study-filed/study-filed.module').then(m=>m.StudyFiledModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseInformationRoutingModule { }
