import { DynamicSelectModule } from 'core/components/dynamics/dynamic-select/dynamic-select.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { InterestsWorkplaceComponent } from './interests-workplace.component';
import { SharedModule } from 'app/shared/modules/shared.module';
import { FindBoxModule } from 'app/core/components/find-box/find-box.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    InterestsWorkplaceComponent
  ],
  imports: [
    DynamicSelectModule,NgbModule,FindBoxModule,
    SharedModule,RouterModule.forChild([{path:'',component:InterestsWorkplaceComponent}])
  ]
})
export class InterestsWorkplaceModule { }
