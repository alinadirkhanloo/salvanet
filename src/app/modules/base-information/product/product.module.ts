import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProductComponent } from './product.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { SharedModule } from 'app/shared/modules/shared.module';
import { PrimeNgModule } from 'app/shared/modules/primeng/primeng.module';
import { AllMaterialModule } from 'app/shared/modules/material/material.module';


@NgModule({
  declarations: [
    ProductComponent,
    ProductFormComponent
  ],
  imports: [
    SharedModule,
    PrimeNgModule,
    AllMaterialModule,
    RouterModule.forChild([{path:'',component:ProductComponent}])
  ]
})
export class ProductModule { }
