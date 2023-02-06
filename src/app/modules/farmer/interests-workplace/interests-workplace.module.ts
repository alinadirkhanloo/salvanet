import { DynamicSelectModule } from 'core/components/dynamics/dynamic-select/dynamic-select.module';
import { PrimeNgModule } from 'shared/modules/primeNg/primeng.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { InterestsWorkplaceComponent } from './interests-workplace.component';
import { SharedModule } from 'app/shared/modules/shared.module';



@NgModule({
  declarations: [
    InterestsWorkplaceComponent
  ],
  imports: [
    PrimeNgModule,
    DynamicSelectModule,
    SharedModule,RouterModule.forChild([{path:'',component:InterestsWorkplaceComponent}])
  ]
})
export class InterestsWorkplaceModule { }
