import { DynamicSelectModule } from 'core/components/dynamics/dynamic-select/dynamic-select.module';
import {PrimeNgModule} from 'shared/modules/primeng/primeng.module';
import { SharedModule } from 'app/shared/modules/shared.module';
import { ProductUnitEditComponent } from './product-unit-edit/product-unit-edit.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProductUnitComponent } from './product-unit.component';
import { UserAuthModule } from 'app/core/components/dynamics/user-auth/user-auth.module';

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
    SharedModule,PrimeNgModule,DynamicSelectModule,
    RouterModule.forChild(routes),
    UserAuthModule
  ]
})
export class ProductUnitModule { }
