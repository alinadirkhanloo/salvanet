import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/modules/shared.module';
import { DynamicSelectModule } from 'app/core/components/dynamics/dynamic-select/dynamic-select.module';
import { RouterModule } from '@angular/router';
import { MembershipEditComponent } from './membership-edit.component';



@NgModule({
  declarations: [
    MembershipEditComponent
  ],
  imports: [
    SharedModule,DynamicSelectModule,
    RouterModule.forChild([{path:'',component:MembershipEditComponent}])
  ]
})
export class MembershipModule { }
