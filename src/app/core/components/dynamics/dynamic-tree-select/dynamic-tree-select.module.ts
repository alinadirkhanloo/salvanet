import { NgModule } from '@angular/core';

import { DynamicTreeSelectComponent } from './dynamic-tree-select.component';
import { TreeSelectModule } from 'primeng/treeselect';
import { RahianSharedModule } from 'shared/modules/rahian/shared.module';


@NgModule(
  {
    declarations: [
      DynamicTreeSelectComponent
    ],
    imports: [
      TreeSelectModule,
      RahianSharedModule
    ],
    exports: [
      DynamicTreeSelectComponent
    ]
  }
)
export class DynamicTreeSelectModule
  {
  }
