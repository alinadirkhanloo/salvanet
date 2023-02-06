import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicPickListComponent } from './dynamic-pick-list.component';
import { PickListModule } from 'primeng/picklist';


@NgModule(
  {
    declarations: [
      DynamicPickListComponent
    ],
    imports: [
      CommonModule,
      PickListModule
    ],
    exports: [
      DynamicPickListComponent
    ]
  }
)
export class DynamicPickListModule
{
}
