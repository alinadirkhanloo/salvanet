import { NgModule } from '@angular/core';
import { PrimeNgModule } from 'app/shared/modules/primeng/primeng.module';
import { SharedModule } from 'app/shared/modules/shared.module';
import { DynamicTreeModule } from '../dynamic-tree/dynamic-tree.module';
import { DynamicFindBoxComponent } from './dynamic-find-box.component';



@NgModule({
  declarations: [
    DynamicFindBoxComponent
  ],
  imports: [
   SharedModule,PrimeNgModule, DynamicTreeModule
  ],
  exports:[DynamicFindBoxComponent]
})
export class DynamicFindBoxModule { }
