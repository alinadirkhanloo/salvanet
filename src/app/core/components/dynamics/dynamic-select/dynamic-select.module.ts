import { NgModule } from '@angular/core';
import { DynamicSelectComponent } from './dynamic-select.component';
import {PrimeNgModule} from 'shared/modules/primeng/primeng.module';
import { SharedModule } from 'app/shared/modules/shared.module';


@NgModule({
  declarations: [
    DynamicSelectComponent
  ],
  imports: [
    SharedModule,PrimeNgModule
  ],
  exports:[DynamicSelectComponent]
})

export class DynamicSelectModule { }
