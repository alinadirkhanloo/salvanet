import { SharedModule } from 'app/shared/modules/shared.module';
import { ProductUnitEditComponent } from './product-unit-edit/product-unit-edit.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProductUnitComponent } from './product-unit.component';

const routes: Routes = [
  {
    path: '', component: ProductUnitComponent
  },
  {
    path: 'edit/:id',component:ProductUnitEditComponent
  },
  {
    path:'new',component:ProductUnitEditComponent
  }
];

@NgModule({
  declarations: [
    ProductUnitComponent,ProductUnitEditComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductUnitModule { }
