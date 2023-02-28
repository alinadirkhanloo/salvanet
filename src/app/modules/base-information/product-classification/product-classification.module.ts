import { PrimeNgModule } from 'shared/modules/primeng/primeng.module';
import { SharedModule } from 'app/shared/modules/shared.module';
import { NgModule } from '@angular/core';
import { ProductClassificationComponent } from './product-classification.component';
import { ProductClassificationFormComponent } from './product-classification-form/product-classification-form.component';
import { AllMaterialModule } from 'app/shared/modules/material/material.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ProductClassificationComponent,
    ProductClassificationFormComponent
  ],
  imports: [
    SharedModule,
    PrimeNgModule,
    AllMaterialModule,
    RouterModule.forChild([{path:'',component:ProductClassificationComponent}])
  ]
})
export class ProductClassificationModule { }
