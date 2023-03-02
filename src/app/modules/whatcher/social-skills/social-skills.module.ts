import { NgModule } from '@angular/core';
import { SocialSkillsComponent } from './social-skills.component';
import { RouterModule } from '@angular/router';
import { DynamicSelectModule } from 'app/core/components/dynamics/dynamic-select/dynamic-select.module';
import { SharedModule } from 'app/shared/modules/shared.module';



@NgModule({
  declarations: [
    SocialSkillsComponent
  ],
  imports: [
    SharedModule,DynamicSelectModule,
    RouterModule.forChild([{path:'',component:SocialSkillsComponent}])
  ]
})
export class SocialSkillsModule { }
