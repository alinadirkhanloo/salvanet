import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreeModule } from 'primeng/tree';
import {PrimeNgModule} from 'shared/modules/primeng/primeng.module';
import { DynamicTreeComponent } from './dynamic-tree.component';


@NgModule({
  declarations: [
    DynamicTreeComponent
  ],
  exports: [
    DynamicTreeComponent
  ],
  imports: [
    CommonModule,
    TreeModule,
    PrimeNgModule,
  ]
})
export class DynamicTreeModule {

}
