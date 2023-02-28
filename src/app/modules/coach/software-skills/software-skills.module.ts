import { NgModule } from '@angular/core';
import { SoftwareSkillsComponent } from './software-skills.component';
import { SharedModule } from 'app/shared/modules/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { DynamicSelectModule } from 'app/core/components/dynamics/dynamic-select/dynamic-select.module';

const routes: Routes = [
  {
    path: '', component:SoftwareSkillsComponent,
  }
];


@NgModule({
  declarations: [
    SoftwareSkillsComponent
  ],
  imports: [
    SharedModule,DynamicSelectModule,
    RouterModule.forChild(routes)
  ]
})
export class SoftwareSkillsModule { }
