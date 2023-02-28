import { DynamicSelectModule } from 'core/components/dynamics/dynamic-select/dynamic-select.module';
import { PrimeNgModule } from 'app/shared/modules/primeng/primeng.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { InterestsWorkplaceComponent } from './interests-workplace.component';
import { SharedModule } from 'app/shared/modules/shared.module';



@NgModule({
  declarations: [
    InterestsWorkplaceComponent
  ],
  imports: [
    DynamicSelectModule,
    SharedModule,RouterModule.forChild([{path:'',component:InterestsWorkplaceComponent}])
  ]
})
export class InterestsWorkplaceModule { }
