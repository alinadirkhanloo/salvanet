import {PrimeNgModule} from 'shared/modules/primeng/primeng.module';
import { DynamicTreeModule } from 'app/core/components/dynamics/dynamic-tree/dynamic-tree.module';
import { NgModule } from '@angular/core';
import { FindBoxComponent } from './find-box.component';
import { SharedModule } from 'app/shared/modules/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    FindBoxComponent
  ],
  imports: [
    DynamicTreeModule,SharedModule,PrimeNgModule,NgbModule
  ],
  exports:[FindBoxComponent]
})
export class FindBoxModule { }
