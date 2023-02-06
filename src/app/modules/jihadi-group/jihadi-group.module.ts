import { NgModule } from '@angular/core';
import { JihadiGroupComponent } from './jihadi-group.component';
import { SharedModule } from 'app/shared/modules/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    JihadiGroupComponent
  ],
  imports: [
    SharedModule,RouterModule.forChild([{path:'',component:JihadiGroupComponent}])
  ]
})
export class JihadiGroupModule { }
