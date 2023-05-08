import { DynamicSelectModule } from './../../../core/components/dynamics/dynamic-select/dynamic-select.module';
import { NgModule } from '@angular/core';
import { CultivarComponent } from './cultivar.component';
import { CultivarFormComponent } from './cultivar-form/cultivar-form.component';
import { RouterModule } from '@angular/router';
import { AllMaterialModule } from 'app/shared/modules/material/material.module';
import { SharedModule } from 'app/shared/modules/shared.module';



@NgModule({
  declarations: [
    CultivarComponent,
    CultivarFormComponent
  ],
  imports: [
    SharedModule,
    AllMaterialModule,DynamicSelectModule,
    RouterModule.forChild([{path:'',component:CultivarComponent}])
  ]
})
export class CultivarModule { }
