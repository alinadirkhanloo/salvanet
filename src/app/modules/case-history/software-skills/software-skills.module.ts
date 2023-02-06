import { NgModule } from '@angular/core';
import { SoftwareSkillsComponent } from './software-skills.component';
import { SoftwareSkillsEditComponent } from './software-skills-edit/software-skills-edit.component';
import { SharedModule } from 'app/shared/modules/shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', component:SoftwareSkillsComponent,
  },
  {
    path: 'edit/:id',component:SoftwareSkillsEditComponent
  },
  {
    path:'new',component:SoftwareSkillsEditComponent
  }
];


@NgModule({
  declarations: [
    SoftwareSkillsComponent,
    SoftwareSkillsEditComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class SoftwareSkillsModule { }
