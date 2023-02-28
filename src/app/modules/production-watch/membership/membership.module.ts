import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembershipComponent } from './membership.component';
import { MembershipEditComponent } from './membership-edit/membership-edit.component';
import { SharedModule } from 'app/shared/modules/shared.module';
import { DynamicSelectModule } from 'app/core/components/dynamics/dynamic-select/dynamic-select.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    MembershipComponent,
    MembershipEditComponent
  ],
  imports: [
    SharedModule,DynamicSelectModule,
    RouterModule.forChild([{path:'',component:MembershipComponent}])
  ]
})
export class MembershipModule { }
